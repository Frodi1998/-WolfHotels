"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = exports.BotClient = void 0;
const assert_1 = require("assert");
const grammy_1 = require("grammy");
const node_assert_1 = __importDefault(require("node:assert"));
const config_1 = require("../config");
// type MessageContext = FilteredContext<Context, Update & Record<"message", L2ShallowFragment<"message">> & Partial<Record<never, undefined>>>
// type MiddlewareFn = (ctx: Context, next: NextFunction) => MaybePromise<unknown>;
class BotClient {
    bot = new grammy_1.Bot(config_1.config.token);
    async start() {
        await Promise.all([
            this.loadMiddlewares(),
            this.loadCommand()
        ]);
        this.bot.start();
    }
    async loadMiddlewares() {
        this.bot.use(this.onError);
        // this.bot.catch(this.onError);
        this.bot.on("message", this.onMessage);
        console.log('middlewares loaded');
    }
    loadCommand() {
        this.bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
    }
    get onMessage() {
        return async (context, next) => {
            // context.isAdmin = context.senderId === config.ownerId || config.adminIds.includes(context.senderId);
            (0, node_assert_1.default)(context.update.message.text !== 'сука', 'Вы ввели запретное слово');
            await context.reply('ку');
            console.log(context);
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
            }
        };
    }
}
exports.BotClient = BotClient;
// export const bot = BotClient.useFactory();
exports.bot = new BotClient();
//# sourceMappingURL=index.js.map