import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreatePatientDto {
  @IsString() @IsNotEmpty()
  name: string;

  @IsString() @IsNotEmpty()
  document: string;

  @IsDateString()
  birthDate: string;
}

