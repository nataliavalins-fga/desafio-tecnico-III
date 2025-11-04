import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // ajuste o caminho relativo conforme sua estrutura
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePatientDto) {
    try {
      return await this.prisma.patient.create({
        data: {
          name: dto.name,
          document: dto.document,
          birthDate: new Date(dto.birthDate),
        },
      });
    } catch (e: any) {
      if (e.code === 'P2002') throw new ConflictException('Documento já cadastrado.');
      throw e;
    }
  }

  async findAll(page = 1, pageSize = 10) {
    const take = Math.max(1, Number(pageSize));
    const skip = (Math.max(1, Number(page)) - 1) * take;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.patient.findMany({ skip, take, orderBy: { createdAt: 'desc' } }),
      this.prisma.patient.count(),
    ]);

    return { items, total, page: Number(page), pageSize: take, pages: Math.ceil(total / take) };
  }

  async findOne(id: string) {
    const patient = await this.prisma.patient.findUnique({ where: { id } });
    if (!patient) throw new NotFoundException('Paciente não encontrado.');
    return patient;
  }

  async update(id: string, dto: UpdatePatientDto) {
    try {
      return await this.prisma.patient.update({
        where: { id },
        data: {
          ...(dto.name && { name: dto.name }),
          ...(dto.document && { document: dto.document }),
          ...(dto.birthDate && { birthDate: new Date(dto.birthDate) }),
        },
      });
    } catch (e: any) {
      if (e.code === 'P2025') throw new NotFoundException('Paciente não encontrado.');
      if (e.code === 'P2002') throw new ConflictException('Documento já cadastrado.');
      throw e;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.patient.delete({ where: { id } });
      return { success: true };
    } catch (e: any) {
      if (e.code === 'P2025') throw new NotFoundException('Paciente não encontrado.');
      throw e;
    }
  }
}
