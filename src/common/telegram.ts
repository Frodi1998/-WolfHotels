import { User } from "@prisma/client";
import { IContext } from "commander-core";
import { Context, SessionFlavor } from "grammy";
import { ScenesFlavor, ScenesSessionFlavor } from "grammy-scenes";

type ContextFlaver = {
  isAdmin: boolean;
  user: User
}

type SessionData = ScenesSessionFlavor & {
    // Your own global session interface, could be empty as well.
  }


export type BotContext = Context & SessionFlavor<SessionData> & ScenesFlavor & IContext & ContextFlaver & IContext & ContextFlaver;