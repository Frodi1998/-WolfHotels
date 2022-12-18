import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const answer = await prisma.answer.upsert({
    where: {command: 'забронировать'},
    update: {},
    create: {
      command: 'забронировать',
      questions: {createMany: {
        data: [
          {alias: 'как я могу забронировать номер'},
          {alias: 'я бы хотел забронировать'},
          {alias: 'помогите забронировать номер'},
        ]
      }}
    }
  })
  console.log({ answer })
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