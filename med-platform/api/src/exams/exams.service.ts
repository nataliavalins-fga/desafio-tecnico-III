import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'api/prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';

@Injectable()
export class ExamsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateExamDto) {
    // garante que o paciente existe
    const patient = await this.prisma.patient.findUnique({ where: { id: dto.patientId } });
    if (!patient) throw new NotFoundException('Paciente não encontrado.');

    // idempotência: tenta criar; se já existir a key, retorna o mesmo exame
    try {
      return await this.prisma.exam.create({
        data: {
          patientId: dto.patientId,
          modality: dto.modality,
          examDate: new Date(dto.examDate),
          idempotencyKey: dto.idempotencyKey,
        },
      });
    } catch (e: any) {
      if (e.code === 'P2002') {
        // já criado por outra requisição; devolve o mesmo
        return this.prisma.exam.findUnique({ where: { idempotencyKey: dto.idempotencyKey } });
      }
      throw e;
    }
  }

  async findAll(page = 1, pageSize = 10) {
    const take = Math.max(1, Number(pageSize));
    const skip = (Math.max(1, Number(page)) - 1) * take;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.exam.findMany({
        skip, take,
        orderBy: { examDate: 'desc' },
        include: { patient: true },
      }),
      this.prisma.exam.count(),
    ]);
    return { items, total, page: Number(page), pageSize: take, pages: Math.ceil(total / take) };
  }

  async findOne(id: string) {
    const exam = await this.prisma.exam.findUnique({ where: { id }, include: { patient: true } });
    if (!exam) throw new NotFoundException('Exame não encontrado.');
    return exam;
  }
}

