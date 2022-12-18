import { AssertionError } from 'assert';
import { Bot, Context, MiddlewareFn, NextFunction, session, SessionFlavor } from "grammy";
import assert from 'node:assert';
import { BotContext } from '../common/telegram';
import { config } from '../config';
import { userService } from '../db/user';

// import { ScenesSessionFlavor, ScenesFlavor } from "grammy-scenes"

import { scenes } from "./scenes/hand_scenes"
import { SIGNUP_SCENE_SLUG } from '../common/text';
import { prisma } from '../db';

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
    this.bot.use(
      session({
        initial: () => ({}),
      })
    )
    this.bot.use(scenes.manager())
    this.bot.use(scenes)

    this.bot.on("message", this.onMessage);

    console.log('middlewares loaded');
  }

  private loadCommand() {
    this.bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
  }

  private get onMessage(): MiddlewareFn {
    return async (context: BotContext, next: NextFunction) => {
      context.isAdmin = context.from?.id === config.ownerId || config.adminIds.includes(context.from?.id!);
      const user = await userService.getByUid(context.from?.id!);

      if (!user) {
        return context.scenes.enter(SIGNUP_SCENE_SLUG);
      }

      context.user = user;

      await next();
    };
  }

  private onCommand() {
    return async (context: BotContext, next: NextFunction) => {
      const alias = context.update.message?.text!;

      // this.bot.
      // const question = await prisma.question.findUnique({where: {alias}, include: {answer: true}});

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

  // private async showIntro(context: BotContext, next: () => void) {
  //   return next();
  // }
}

// export const bot = BotClient.useFactory();
export const bot = new BotClient();
