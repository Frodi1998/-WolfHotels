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
} 

export default AcceprRequestCommand.init(/^mailling$/i);