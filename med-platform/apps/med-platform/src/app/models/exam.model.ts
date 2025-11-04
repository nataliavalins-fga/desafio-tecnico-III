export enum DicomModality {
  CR = 'CR',
  CT = 'CT',
  DX = 'DX',
  MG = 'MG',
  MR = 'MR',
  NM = 'NM',
  OT = 'OT',
  PT = 'PT',
  RF = 'RF',
  US = 'US',
  XA = 'XA',
}

export interface Exam {
  id?: string;
  patientId: string;
  modality: DicomModality;
  examDate: string; // formato ISO (ex: "2025-11-03T10:00:00.000Z")
  idempotencyKey: string;
  createdAt?: string;
  updatedAt?: string;
}
