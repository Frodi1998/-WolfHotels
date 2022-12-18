import { Command } from 'commander-core';
import { stripIndent } from 'common-tags';
import { InlineKeyboard } from 'grammy';
import { BOOK_HELP_BUTONS, BOOK_MORE_HELP_BUTONS } from '../../common/buttons';
import { BotContext } from '../../common/telegram';
import { LINK_FOR_SUITE } from '../../common/text';

export default new Command({
  pattern: /^(?:[а-я\s\d]+)*(?:ключ(?:и)*)(?:[а-я\s\d]+)*/i,
  name: 'ключ',
  description: 'информация про ключ от отеля',

  async handler(context: BotContext) {
      const text = stripIndent`
        <b>🔆 Вы получите письмо от хозяина квартиры / менеджера апартаментов, в котором подтверждается Ваша бронь на номер в аппарт-отеле/ квартиру и сообщаются подробности, 
        Например, место и время получения ключей от снятого Вами номера/квартиры. 
        Такое письмо может прийти Вам в течение суток после бронирования.</b>
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