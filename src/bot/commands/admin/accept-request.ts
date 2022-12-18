import assert from 'assert';
// import { Command } from 'commander-core';
// import { stripIndent } from 'common-tags';
// import { getAcceptRequestButton } from '../../../common/buttons';
import { BotContext } from '../../../common/telegram';
import { CustomCommand } from '../../handler';

class AcceprRequestCommand extends CustomCommand {
  async run(context: BotContext) {
    assert(context.isAdmin, 'Вы не можете принять запрос');
    const id = Number(context.body?.groups?.id!)
    console.log('Сработал запрос')
    // let id = context.callbackQuery!.data!.split('accept_request').join(',').trim()
    console.log(`ID-шник пользователя: ${id}`)
  }

  // private sendOperator(context: BotContext) {
  //   const text = `<b>📲 Поступил новый запрос в техническую поддержку.</b>`
    
  //   return context.api.sendMessage(5269232648, text, {
  //     reply_markup: getAcceptRequestButton(context.from!.id),
  //     parse_mode: "HTML"
  //   })
  // }
} 

export default AcceprRequestCommand.init(/^(?:accept_request|принять запрос)\s+(?<id>\d+)$/i);