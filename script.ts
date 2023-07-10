import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export const usersData = prisma.users.findMany()

async function main() {
  const users = await prisma.users.findMany()
  console.log(users)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
