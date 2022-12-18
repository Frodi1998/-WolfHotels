"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./bot");
const db_1 = require("./db");
async function main() {
    await db_1.prisma.$connect();
    bot_1.bot.start().then(() => console.log('bot started')).catch(err => console.log('тварь ошиблась'));
}
main()
    .then(async () => {
    await db_1.prisma.$disconnect();
})
    .catch(error => {
    console.error(error);
    db_1.prisma.$disconnect().then(() => {
        process.exit(1);
    });
});
