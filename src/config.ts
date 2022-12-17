import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  token: process.env.BOT_TOKEN!,
  ownerId: Number(process.env.OWNER_ID!),
  adminIds: getJson<number[]>("ADMIN_IDS"),
};

function getJson<T>(key: string): T {
  return JSON.parse(process.env[key]!) as T;
}
