import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const toBook = await prisma.answer.upsert({
    where: {command: 'забронировать'},
    update: {},
    create: {
      command: 'забронировать',
      questions: {createMany: {
        data: [
          {alias: 'как я могу забронировать номер'},
          {alias: 'я бы хотел забронировать отель'},
          {alias: 'помогите забронировать номер'},
        ]
      }}
    }
  })

  const toDiscount = await prisma.answer.upsert({
    where: {command: 'скидка'},
    update: {},
    create: {
      command: 'скидка',
      questions: {createMany: {
        data: [
          {alias: 'могу ли я получить свою персональную скидку'},
          {alias: 'я бы хотел получить скидку'},
          {alias: 'скидки'},
          {alias: 'есть ли у вас скидки?'},
          {alias: 'как я могу получить скидку?'},
          {alias: 'можно ли у вас получить скидку?'},
        ]
      }}
    }
  })
  
  console.log({ answer: toBook })
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