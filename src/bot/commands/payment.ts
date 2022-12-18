import { Command } from 'commander-core';
import { stripIndent } from 'common-tags';
import { BotContext } from '../../common/telegram';

export default new Command({
  pattern: /^(?:[а-я\s\d]+)*(?:цена|оплатить|купить)(?:[а-я\s\d]+)*/i,
  name: 'цена',
  description: 'стоимость отеля',

  async handler(context: BotContext) {
    const text = stripIndent`
      <b>🔆 Оплатить отель, а также узнать цены можно на нашем</b> <a href="http://79.137.196.10:7777/wolf-hotels.ru/index.html">сайте</a>
      ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
      💡 Для того, чтобы оплатить отель нужно выполнить ряд несложных действий:
      <code>1.</code> Перейти на сайт из ссылки выше
      <code>2.</code> Выбрать подходяющую и доступную для вас дату заезда
      <code>3.</code> Выбрать подходяющую и доступную для вас дату выезда
      <code>4.</code> Выбрать количество взрослых
      <code>5.</code> Выбрать количество детей (2 - 11 лет)
      <code>6.</code> Нажать на кнопку "Найти" и далее выбрать отель по подобранным параметрам
      <code>7.</code> Цена оплаты формируется индивидуально для каждого отеля, поэтому цены могут варьироваться!
    `
    return context.reply(text, {
      parse_mode: "HTML"
    })
    // await context.reply(`<b>📚 Вероятнее всего, вы имели ввиду оплату или стоимость отеля.</b>\n👇 Выберите одну из подсказок на клавиатуре.`, {
    //     parse_mode: "HTML"
    // });
  },
});