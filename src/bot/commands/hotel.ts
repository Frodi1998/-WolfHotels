import { Command } from 'commander-core';
import { stripIndent } from 'common-tags';
import { InlineKeyboard } from 'grammy';
import { BOOK_HELP_BUTONS, BOOK_MORE_HELP_BUTONS } from '../../common/buttons';
import { BotContext } from '../../common/telegram';
import { LINK_FOR_SUITE } from '../../common/text';

export default new Command({
  pattern: /^(?:[а-я\s\d]+)*(?:гостиниц[уыа]|отел[яией])(?:[а-я\s\d]+)*/i,
  name: 'гостиница',
  description: 'информация о гостиницах',

  async handler(context: BotContext) {
      const text = stripIndent`
        <b>🔆 Информация о доступных гостиницах доступна на нашем</b> <a href="${LINK_FOR_SUITE}">сайте</a>
        ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
        💡 Если вопрос касается маршрутов до гостиницы, то все маршруты будут отправлены вам на адрес, который вы укажете после оформления.
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