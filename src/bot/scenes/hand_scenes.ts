import { ScenesComposer } from "grammy-scenes"

import { BotContext } from "../../common/telegram"
import { signupScene } from "./signupScene"
// import { otherScene } from "./other"

export const scenes = new ScenesComposer<BotContext>(signupScene)

