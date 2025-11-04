import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../../prisma/prisma.module';
import { PatientsController } from '../patients/patients.controller';
import { PatientsService } from '../patients/patients.service';
import { ExamsController } from '../exams/exams.controller';
import { ExamsService } from '../exams/exams.service';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule],
  controllers: [PatientsController, ExamsController, AppController],
  providers: [PatientsService, ExamsService],
})
export class AppModule {}

