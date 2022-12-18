import { Command } from 'commander-core';
import { stripIndent } from 'common-tags';
import { InlineKeyboard } from 'grammy';
import { BOOK_HELP_BUTONS, BOOK_MORE_HELP_BUTONS } from '../../common/buttons';
import { BotContext } from '../../common/telegram';
import { LINK_FOR_SUITE } from '../../common/text';

export default new Command({
  pattern: /^(?:[а-я\s\d]+)*(?:бронь|заброн|забран|бран|брони|бронировать|броней)(?:[а-я\s\d]+)*/i,
  name: 'бронь',
  description: 'бронирование отеля',

  async handler(context: BotContext) {
      const text = stripIndent`
        <b>🔆 Забронировать отель можно на нашем</b> <a href="${LINK_FOR_SUITE}">сайте</a>
        ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
        💡 Для того, чтобы забронировать отель нужно выполнить ряд несложных действий:
        <code>1.</code> Перейти на сайт из ссылки выше
        <code>2.</code> Выбрать подходяющую и доступную для вас дату заезда
        <code>3.</code> Выбрать подходяющую и доступную для вас дату выезда
        <code>4.</code> Выбрать количество взрослых
        <code>5.</code> Выбрать количество детей (2 - 11 лет)
        <code>6.</code> Нажать на кнопку "Найти" и далее выбрать отель по подобранным параметрам
      `
      return context.reply(text, {
          parse_mode: "HTML",
          reply_markup: BOOK_HELP_BUTONS
      })
    
    // await context.reply(`<b>📚 Вероятнее всего, вы имели ввиду бронирование отеля.</b>\n👇 Выберите одну из подсказок на клавиатуре.`, {
    //     parse_mode: "HTML",
    //     reply_markup: BOOK_MORE_HELP_BUTONS
    // });
  },
});