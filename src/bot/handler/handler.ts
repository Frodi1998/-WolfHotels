import { Handler, IHandlerParams } from 'commander-core';
import path, { dirname } from 'path';
// import { fileURLToPath } from 'url';

// import { ExtendedCallbackContext, ExtendedMessageContext } from '../../common/vk';
// import { ADMIN_MENU_BUTTONS, MAIN_MENU_BUTTONS } from '../../common/buttons.js';
// import { CustomCommand } from './helpers';
import { Utils } from './utils.js';
// import { ErrorManager } from '../../common/error';
// import { MAIN_MENU } from '../../common/text';
// import { MessageContext, MessageEventContext } from 'vk-io';

// const __dirname = dirname(fileURLToPath(import.meta.url));

// interface IListener {
//   context: ExtendedMessageContext | ExtendedCallbackContext;
//   utils: Utils;
//   error: Error;
// }

class HandlerClient extends Handler {
  // private readonly errorManager = ErrorManager.instance;

  public static useFactory() {
    const params: IHandlerParams = {
      commands: {
        directory: path.join(__dirname, '..', 'commands'),
        // directory: path.resolve('src', 'bot', 'commands'),
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

  // public get middleware() {
  //   return async (context: ExtendedMessageContext, next: () => Promise<void>) => {
  //     const { messagePayload } = context;

  //     if (messagePayload?.cmd || context.text) {
  //       context.$command = messagePayload?.cmd ? (messagePayload.cmd as string) : context.text!;
  //       await this.execute(context);
  //     }

  //     return next();
  //   };
  // }

  // public get callbackMiddleware() {
  //   return async (context: ExtendedCallbackContext, next: () => Promise<void>) => {
  //     const { eventPayload } = context;

  //     if (eventPayload?.cmd) {
  //       context.$command = eventPayload?.cmd as string;
  //       await this.execute(context);
  //     }

  //     return next();
  //   };
  // }

  private loadEventListeners(): void {
    // this.events.on('command_begin', this.onBegin);
    // this.events.on('command_not_found', this.onFallback);
    // this.events.on('command_job', this.onJob);
    // this.events.on('command_error', this.onError);
    // this.events.on('command_ready', this.onReady);

    console.log('event listeners loaded');
  }

  // private get onBegin() {
  //   return async ({ context }: IListener) => {
  //     if (!context.$command) {
  //       context.$command = context.text;
  //     }

  //     context.$command = context.$command!.trim();
  //   };
  // }

  // private get onFallback() {
  //   return ({ context }: IListener) => {
  //     if (context instanceof MessageEventContext) {
  //       return;
  //     }

  //     if (!context.isChat) {
  //       return this.showMenu(context);
  //     }
  //   };
  // }

  // private get onJob() {
  //   return ({ context, utils }: IListener) => {
  //     const command = utils.getCommand as CustomCommand;
  //     const hasAccess = command instanceof CustomCommand && command.hasAccess(context);
  //     const isMessageContext = context instanceof MessageContext;

  //     if (!hasAccess) {
  //       utils.setCommandStatus('ready');
  //     }

  //     if (isMessageContext && !hasAccess) {
  //       this.showMenu(context);
  //     }
  //   };
  // }

  // private get onError() {
  //   return async ({ context, error }: IListener) => {
  //     if (context instanceof MessageEventContext) {
  //       return;
  //     }

  //     return this.errorManager.handle(context, error);
  //   };
  // }

  // private showMenu(context: ExtendedMessageContext) {
  //   const keyboard = context.isAdmin ? ADMIN_MENU_BUTTONS : MAIN_MENU_BUTTONS;
  //   return context.send(MAIN_MENU, { keyboard });
  // }
}

export const handler = HandlerClient.useFactory();
