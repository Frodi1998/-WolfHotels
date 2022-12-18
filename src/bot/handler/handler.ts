import { Handler, IHandlerParams } from 'commander-core';
import { stripIndent } from 'common-tags';
import { InlineKeyboard } from 'grammy';
import path from 'path';
import { FALLBACK_BUTTONS } from '../../common/buttons.js';
import { BotContext } from '../../common/telegram.js';
import { prisma } from '../../db/index.js';

import { Utils } from './utils.js';

interface IListener {
  context: BotContext;
  utils: Utils;
  error: Error;
}

class HandlerClient extends Handler {

  public static useFactory() {
    const params: IHandlerParams = {
      commands: {
        directory: path.join(__dirname, '..', 'commands'),
      },
      strictLoader: true,
      utils: Utils.instance,
    };

    return new HandlerClient(params);
  }

  public async load(): Promise<void> {
    await Promise.all([this.loadEventListeners(), this.loadCommands()])
      .then(() => {
        console.log('Commands loaded');
      })
      .catch(console.error);
  }

  private loadEventListeners(): void {
    this.events.on('command_not_found', this.onFallback);
    this.events.on('command_error', this.onError);
    
    console.log('event listeners loaded');
  }

  private get onFallback() {
    return async ({ context }: IListener) => {
      if(!context.session.isInit) {
        const alias = context.$command!;

        const question = await prisma.question.findFirst({
          where: { alias: { contains: alias } }, 
          include: {answer: true },
        })

        if(!question) {
          context.session.isInit = false;
          const text = stripIndent`
            <b>😔 Я вас не понимаю.
            Попробуйте повторить попытку, переформулировав вопрос.</b>
            ☎️ Вам нужна помощь оператора в решении проблемы?
          `;
          
          return context.reply(text, {
            reply_markup: FALLBACK_BUTTONS,
            parse_mode: "HTML"
          })
        } 

        context.session.isInit = true;
        context.$command = question?.answer?.command;
        return this.execute(context);
      }
      
      console.log('warn: fallback is called');
      context.session.isInit = false;
    };
  }

  private get onError() {
    return async ({ error }: IListener) => {
      throw error
    }
  }
}

export const handler = HandlerClient.useFactory();
