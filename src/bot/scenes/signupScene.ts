import { stripIndent } from "common-tags"
import { Scene } from "grammy-scenes"

import { BotContext } from "../../common/telegram"
import { SIGNUP_SCENE_SLUG } from "../../common/text"
import { config } from "../../config"
import { userService } from "../../db"

export const signupScene = new Scene<BotContext, { name?: string, isAdmin: boolean }>(SIGNUP_SCENE_SLUG)

signupScene.use(async (context, next) => {
  const isAdmin = context.from!.id === config.ownerId || config.adminIds.includes(context.from!.id!);
  context.scene.session = { isAdmin };
  console.log(isAdmin);
  
  return next()
})

signupScene.do(async (ctx) => {
  await ctx.reply(`<b>👋 Здравствуйте!</b>\n<i>👉 Введите пожалуйста свое имя , чтобы пройти регистрацию.</i>`, {
    parse_mode: "HTML"
  })
})

signupScene.wait().on("message:text", async (ctx) => {
  let name = ctx.message!.text!

  // здесь создается запись в базе даных и дальше уже пользователь может задавать вопросы
  const text = stripIndent`
    <b>☀️ Приветствую,</b> <code>${name}</code>!
    ➖➖➖➖➖➖➖➖
    <i>ℹ️ Я - бот-помощник нашего сайта</i> <a href="http://79.137.196.10:7777/wolf-hotels.ru/index.html">"Wolf Hotels"</a>
    ❔ Если у вас есть какие-то вопросы, вы можете задать их мне в этом чате или выбрать список интересующих вас вопросов на инлайн-клавиатуре.
  `

  
  await ctx.reply(text, {
    parse_mode: "HTML"
  })
  const user = await userService.create({uid: ctx.from!.id!, name, isAdmin: ctx.scene.session.isAdmin})

  console.log(`new user: `, user)
  // ctx.scene.resume();
  ctx.scene.exit()
})