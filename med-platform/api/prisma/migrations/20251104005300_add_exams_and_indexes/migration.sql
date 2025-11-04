/*
  Warnings:

  - Added the required column `updatedAt` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Exam" DROP CONSTRAINT "Exam_patientId_fkey";

-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Exam_patientId_examDate_idx" ON "Exam"("patientId", "examDate");

-- CreateIndex
CREATE INDEX "Exam_modality_idx" ON "Exam"("modality");

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
