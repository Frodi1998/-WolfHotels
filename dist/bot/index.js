"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = exports.BotClient = void 0;
const assert_1 = require("assert");
const grammy_1 = require("grammy");
require("node:assert");
require("../common/telegram");
const config_1 = require("../config");
const user_1 = require("../db/user");
// import { ScenesSessionFlavor, ScenesFlavor } from "grammy-scenes"
const hand_scenes_1 = require("./scenes/hand_scenes");
const text_1 = require("../common/text");
require("../db");
const handler_1 = require("./handler");
require("../common/buttons");
class BotClient {
    bot = new grammy_1.Bot(config_1.config.token);
    handler = handler_1.handler;
    async start() {
        await Promise.all([
            this.handler.load(),
            this.loadMiddlewares(),
            // this.loadCommand()
        ]);
        this.bot.start();
        this.bot.catch(this.bot.errorHandler);
    }
    async loadMiddlewares() {
        this.bot.use(this.onError);
        this.bot.use((0, grammy_1.session)({
            initial: () => ({}),
        }));
        this.bot.use(hand_scenes_1.scenes.manager());
        this.bot.use(hand_scenes_1.scenes);
        this.bot.on("message", this.onMessage);
        this.bot.on("message", this.onCommand);
        this.bot.on('callback_query:data', this.onCallback);
        console.log('middlewares loaded');
    }
    // private loadCommand() {
    //   this.bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
    // }
    get onCallback() {
        return async (ctx, next) => {
            console.log(ctx.callbackQuery.data?.indexOf('accept_request'));
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
        };
    }
    get onMessage() {
        return async (context, next) => {
            context.isAdmin = context.from?.id === config_1.config.ownerId || config_1.config.adminIds.includes(context.from?.id);
            const user = await user_1.userService.getByUid(context.from?.id);
            if (!user) {
                return context.scenes.enter(text_1.SIGNUP_SCENE_SLUG);
            }
            context.user = user;
            console.log('типо отсюда выходим');
            await next();
        };
    }
    get onCommand() {
        return async (context, next) => {
            console.log('onCommand');
            // const alias = context.update.message?.text!;
            context.$command = context.update.message?.text;
            await this.handler.execute(context);
            await next();
        };
    }
    get onError() {
        return async (context, next) => {
            try {
                await next();
            }
            catch (error) {
                if (error instanceof assert_1.AssertionError) {
                    return context.reply(error.message);
                }
                throw error;
            }
        };
    }
}
exports.BotClient = BotClient;
exports.bot = new BotClient();
