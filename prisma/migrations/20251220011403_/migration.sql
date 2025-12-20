/*
  Warnings:

  - A unique constraint covering the columns `[name,createdBy]` on the table `WorkoutRoutine` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "WorkoutProgram" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "durationWeeks" INTEGER NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkoutProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramRoutine" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "routineId" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "notes" TEXT,

    CONSTRAINT "ProgramRoutine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WorkoutProgram_createdBy_idx" ON "WorkoutProgram"("createdBy");

-- CreateIndex
CREATE INDEX "ProgramRoutine_programId_idx" ON "ProgramRoutine"("programId");

-- CreateIndex
CREATE UNIQUE INDEX "ProgramRoutine_programId_weekNumber_dayNumber_key" ON "ProgramRoutine"("programId", "weekNumber", "dayNumber");

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutRoutine_name_createdBy_key" ON "WorkoutRoutine"("name", "createdBy");

-- AddForeignKey
ALTER TABLE "WorkoutProgram" ADD CONSTRAINT "WorkoutProgram_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramRoutine" ADD CONSTRAINT "ProgramRoutine_programId_fkey" FOREIGN KEY ("programId") REFERENCES "WorkoutProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramRoutine" ADD CONSTRAINT "ProgramRoutine_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "WorkoutRoutine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
