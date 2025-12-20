import { PrismaClient } from "@prisma/client";
import { exercises } from "./seed-data/exercise";
import { routines } from "./seed-data/routine";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // ---------------------------------------------------------------------------
  // 1. SYSTEM USER (required for routines.createdBy)
  // ---------------------------------------------------------------------------
  const systemUser = await prisma.user.upsert({
    where: { email: "system@workout.app" },
    update: {},
    create: {
      email: "system@workout.app",
      name: "System",
      username: "system",
      emailVerified: true,
    },
  });

  console.log("✅ System user ready");

  // ---------------------------------------------------------------------------
  // 2. GLOBAL EXERCISES
  // ---------------------------------------------------------------------------
  const exerciseMap = new Map<string, string>();

  for (const exercise of exercises) {
    const created = await prisma.exercise.upsert({
      where: { name: exercise.name },
      update: {},
      create: {
        name: exercise.name,
        category: exercise.category,
        muscleGroups: exercise.muscleGroups,
        equipmentNeeded: exercise.equipmentNeeded ?? null,
        instructions: exercise.instructions ?? null,
        videoUrl: exercise.videoUrl || null,
        demoGifUrl: exercise.demoGifUrl || null,
        isPublic: true,
        createdBy: null, // GLOBAL
      },
    });

    exerciseMap.set(created.name, created.id);
  }

  console.log(`✅ Seeded ${exerciseMap.size} exercises`);

  // ---------------------------------------------------------------------------
  // 3. GLOBAL ROUTINES
  // ---------------------------------------------------------------------------
  for (const routine of routines) {
    const createdRoutine = await prisma.workoutRoutine.upsert({
      where: {
        // Assumes a unique constraint on (name, createdBy)
        name_createdBy: {
          name: routine.name,
          createdBy: systemUser.id,
        },
      },
      update: {},
      create: {
        name: routine.name,
        description: routine.description ?? null,
        isPublic: true,
        createdBy: systemUser.id,
      },
    });

    // Clear existing exercises (safe re-seed)
    await prisma.workoutExercise.deleteMany({
      where: { routineId: createdRoutine.id },
    });

    let orderIndex = 0;

    for (const ex of routine.exercises) {
      const exerciseId = exerciseMap.get(ex.name);

      if (!exerciseId) {
        throw new Error(`Exercise not found: ${ex.name}`);
      }

      await prisma.workoutExercise.create({
        data: {
          routineId: createdRoutine.id,
          exerciseId,
          orderIndex,
          targetSets: ex.sets,
          targetReps: ex.reps ?? null,
          targetDuration: ex.duration ?? null,
        },
      });

      orderIndex++;
    }
  }

  console.log("✅ Seeded routines with exercises");
  console.log("🌱 Database seed complete");
}

main()
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
