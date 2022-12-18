import { AssertionError } from 'assert';
import { Bot, Context, InlineKeyboard, MiddlewareFn, NextFunction, session, SessionFlavor } from "grammy";
import assert from 'node:assert';
import { BotContext } from '../common/telegram';
import { config } from '../config';
import { userService } from '../db/user';

// import { ScenesSessionFlavor, ScenesFlavor } from "grammy-scenes"

import { scenes } from "./scenes/hand_scenes"
import { SIGNUP_SCENE_SLUG } from '../common/text';
import { prisma } from '../db';
import { handler } from './handler';
import { getAcceptRequestButton, HELP_BUTTONS } from '../common/buttons';

export class BotClient {
  private readonly bot = new Bot(config.token);
  private readonly handler = handler;

  async start() {
    await Promise.all([
      this.handler.load(),
      this.loadMiddlewares(),
      // this.loadCommand()
    ]);

    this.bot.start()
    this.bot.catch(this.bot.errorHandler)
  }

  private async loadMiddlewares() {
    this.bot.use(this.onError);
    this.bot.use(
      session({
        initial: () => ({}),
      })
    )
    this.bot.use(scenes.manager())
    this.bot.use(scenes)

    this.bot.on("message", this.onMessage);
    this.bot.on("message", this.onCommand);
    this.bot.on('callback_query:data', this.onCallback)

    console.log('middlewares loaded');
  }

  // private loadCommand() {
  //   this.bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
  // }

  private get onCallback(): MiddlewareFn {
    return async (ctx: BotContext, next: NextFunction) => {
      console.log(ctx.callbackQuery!.data?.indexOf('accept_request'));

      ctx.$command = ctx.callbackQuery?.data;
      await this.handler.execute(ctx);

      // if(ctx.callbackQuery?.data == "more_help") {
      //   ctx.$command = ctx.callbackQuery?.data;
      //   this.handler.execute(ctx);
      // }
      
      // if(ctx.callbackQuery?.data == "operator") {
      //   ctx.$command = ctx.callbackQuery?.data;
      //   this.handler.execute(ctx);
      // }
      
      // if(ctx.callbackQuery!.data!.indexOf('accept_request') != -1) {
      //   console.log('Сработал запрос')
      //   let id = ctx.callbackQuery!.data!.split('accept_request').join(',').trim()
      //   console.log(`ID-шник пользователя: ${id}`)

      // }
      await ctx.answerCallbackQuery();
    }
  }

  private get onMessage(): MiddlewareFn {
    return async (context: BotContext, next: NextFunction) => {
      context.isAdmin = context.from?.id === config.ownerId || config.adminIds.includes(context.from?.id!);
      const user = await userService.getByUid(context.from?.id!);

      if (!user) {
        return context.scenes.enter(SIGNUP_SCENE_SLUG);
      }

      context.user = user;

      console.log('типо отсюда выходим')
      await next();
    };
  }

  private get onCommand(): MiddlewareFn {
    return async (context: BotContext, next: NextFunction) => {
      console.log('onCommand')
      // const alias = context.update.message?.text!;
      context.$command = context.update.message?.text!;
      await this.handler.execute(context);

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

        throw error
      }
    };
  }
}

export const bot = new BotClient();
