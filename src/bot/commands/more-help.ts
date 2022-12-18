import { Command } from 'commander-core';
// import { stripIndent } from 'common-tags';
import { HELP_BUTTONS } from '../../common/buttons';
import { BotContext } from '../../common/telegram';

export default new Command({
  pattern: /^\/*(?:start|more_help|помощь|помогите)/i,
  // name: 'помощь',
  // description: 'помощь',

  async handler(context: BotContext) {
    const text = `<b>ℹ️ Выберите интересующий вас вопрос на клавиатуре или напишите его в ручном режиме:</b>`
    
    if (context.callbackQuery) {
      return context.editMessageText(text, {
        parse_mode: "HTML",
        reply_markup: HELP_BUTTONS
      })
    }

    return context.reply(text, {
      parse_mode: "HTML",
      reply_markup: HELP_BUTTONS
    })
  },
});