export interface Patient {
  id?: string;
  name: string;
  document: string;
  birthDate: string; // formato ISO (ex: "1990-01-01T00:00:00.000Z")
  createdAt?: string;
  updatedAt?: string;
}
