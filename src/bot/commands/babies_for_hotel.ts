import { Command } from 'commander-core';
import { stripIndent } from 'common-tags';
import { InlineKeyboard } from 'grammy';
import { BOOK_HELP_BUTONS, BOOK_MORE_HELP_BUTONS } from '../../common/buttons';
import { BotContext } from '../../common/telegram';
import { LINK_FOR_SUITE } from '../../common/text';

export default new Command({
  pattern: /^(?:[а-я\s\d]+)*(?:дет[ики]|детьми|ребен[оккаочка])(?:[а-я\s\d]+)*/i,
  name: 'дети в отеле',
  description: 'информация про детей, которые будут размещены в отеле',

  async handler(context: BotContext) {
      const text = stripIndent`
        <b>🔆 Часто дети младше 12 лет бесплатно проживают в номере родителей, если дополнительные кровати не ставятся. 
        Возрастной ценз и условия предоставления дополнительной кровати для ребёнка могут меняться в зависимости от правил гостиницы. 
        Обычно это указывается на странице сведений о гостинице.</b>
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