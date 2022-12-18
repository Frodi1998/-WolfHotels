import { bot } from "./bot";
import {prisma} from './db';

async function main() {
  await prisma.$connect();
  bot.start().then(() => console.log('bot started'));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(error => {
    console.error(error);
    prisma.$disconnect().then(() => {
      process.exit(1);
    });
  });
