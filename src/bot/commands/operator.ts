import { Command } from 'commander-core';
import { stripIndent } from 'common-tags';
import { InlineKeyboard } from 'grammy';
import { BOOK_HELP_BUTONS, BOOK_MORE_HELP_BUTONS, getAcceptRequestButton } from '../../common/buttons';
import { BotContext } from '../../common/telegram';
import { LINK_FOR_SUITE } from '../../common/text';
import { CustomCommand } from '../handler';

class OperatorCommand extends CustomCommand {
  async run(context: BotContext) {
    const text = stripIndent`
      <b>🔄 Переключаю вас на оператора.</b>
      <i>🕰 Время ожидания может варьироваться в зависимости от нагруженности.</i>
    `
    if (context.callbackQuery) {
      await context.editMessageText(text, {
        parse_mode: "HTML"
      })
    } else {
      await context.reply(text, {
        parse_mode: "HTML"
      })
    }

    return this.sendOperator(context)
  }

  private sendOperator(context: BotContext) {
    const text = `<b>📲 Поступил новый запрос в техническую поддержку.</b>`
    
    return context.api.sendMessage(5269232648, text, {
      reply_markup: getAcceptRequestButton(context.from!.id),
      parse_mode: "HTML"
    })
  }
} 

export default OperatorCommand.init(/^(?:operator|оператор)$/i);