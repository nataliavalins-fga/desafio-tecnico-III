import { IsNotEmpty, IsString, IsEnum, IsUUID, IsDateString } from 'class-validator';
import { DicomModality } from '@prisma/client';

export class CreateExamDto {
  @IsUUID() @IsNotEmpty()
  patientId: string;

  @IsEnum(DicomModality) @IsNotEmpty()
  modality: DicomModality;

  @IsDateString() @IsNotEmpty()
  examDate: string; // ISO 8601

  @IsString() @IsNotEmpty()
  idempotencyKey: string;
}
