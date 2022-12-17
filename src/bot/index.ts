import { AssertionError } from 'assert';
import { Bot, Context, MiddlewareFn, NextFunction } from "grammy";
import assert from 'node:assert';
import { config } from '../config';

// type MessageContext = FilteredContext<Context, Update & Record<"message", L2ShallowFragment<"message">> & Partial<Record<never, undefined>>>
// type MiddlewareFn = (ctx: Context, next: NextFunction) => MaybePromise<unknown>;

export class BotClient {
  private readonly bot = new Bot(config.token);

  async start() {
    await Promise.all([
      this.loadMiddlewares(),
      this.loadCommand()
    ])

    this.bot.start();
  }

  private async loadMiddlewares() {
    this.bot.use(this.onError);
    // this.bot.catch(this.onError);
    this.bot.on("message", this.onMessage);

    console.log('middlewares loaded');
  }

  private loadCommand() {
    this.bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
  }

  private get onMessage(): MiddlewareFn {
    return async (context: Context, next: NextFunction) => {
      // context.isAdmin = context.senderId === config.ownerId || config.adminIds.includes(context.senderId);
      assert(context.update.message!.text! !== 'сука', 'Вы ввели запретное слово')
      await context.reply('ку');
      console.log(context)

      await next();
    };
  }

  private get onError() {
    return async (context: Context, next: NextFunction) => {
      try {
        await next();
      } catch (error) {
        if (error instanceof AssertionError) {
          return context.reply(error.message);
        }
      }
    };
  }
}

// export const bot = BotClient.useFactory();
export const bot = new BotClient();
