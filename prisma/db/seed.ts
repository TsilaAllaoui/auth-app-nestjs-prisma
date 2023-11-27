import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function clearUserTable() {
  await prisma.user.deleteMany();
}

async function main() {
  await clearUserTable();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
