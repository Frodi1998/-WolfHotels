import { Command } from 'commander-core';
import { stripIndent } from 'common-tags';
import { InlineKeyboard } from 'grammy';
import { BOOK_HELP_BUTONS, BOOK_MORE_HELP_BUTONS } from '../../common/buttons';
import { BotContext } from '../../common/telegram';
import { LINK_FOR_SUITE } from '../../common/text';

export default new Command({
  pattern: /^(?:[а-я\s\d]+)*(?:парковка|парковать)(?:[а-я\s\d]+)*/i,
  name: 'парковка',
  description: 'информация про парковку автомобилей',

  async handler(context: BotContext) {
    //   const text = stripIndent`
    //     <b>Большинство гостиниц и квартир предоставляют своим клиентам бесплатные парковки, но в некоторых из них за парковку может взиматься плата. Долговременная парковка предоставляется на усмотрение гостиницы (часто в зависимости от стоимости парковки и перелета). Это может указываться на странице сведений о гостинице.</b>
    //   `
      return context.reply(`<b>Большинство гостиниц и квартир предоставляют своим клиентам бесплатные парковки, но в некоторых из них за парковку может взиматься плата. Долговременная парковка предоставляется на усмотрение гостиницы (часто в зависимости от стоимости парковки и перелета). Это может указываться на странице сведений о гостинице.</b>`, {
          parse_mode: "HTML",
          reply_markup: BOOK_HELP_BUTONS
      })
    
    // await context.reply(`<b>📚 Вероятнее всего, вы имели ввиду бронирование отеля.</b>\n👇 Выберите одну из подсказок на клавиатуре.`, {
    //     parse_mode: "HTML",
    //     reply_markup: BOOK_MORE_HELP_BUTONS
    // });
  },
});