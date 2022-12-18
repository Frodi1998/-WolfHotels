import { InlineKeyboard } from "grammy";
import { CALLING_THE_OPERATOR, MORE_QUESTIONS } from "./text";

// export const ACCEPT_REQUST_BUTTON = 

export const BOOK_HELP_BUTONS = new InlineKeyboard()
  .text(MORE_QUESTIONS, "more_help").row()
  .text(CALLING_THE_OPERATOR, "operator");

export const BOOK_MORE_HELP_BUTONS = new InlineKeyboard() 
  .text("❔ Как забронировать?", "book_help").row()
  .text("❔ Какие цены на бронь?", "book_price").row()
  .text(CALLING_THE_OPERATOR, "operator");

export const FALLBACK_BUTTONS = new InlineKeyboard()
  .text(CALLING_THE_OPERATOR, "operator").row()
  .text(MORE_QUESTIONS, "more_help").row();

export const HELP_BUTTONS = new InlineKeyboard()
  .text("❔ Как забронировать?", "book_help").row()
  .text("❔ Какие цены на бронь?", "book_price").row()
  .text("❔ Какое время обработки заявки на бронь?", "book_price").row()
  .text("❔ Через какое время обработают мою заявку на бронь?", "book_price").row()
  .text("❔ Возможность специальных скидок на бронь?", "book_price").row()

export function getAcceptRequestButton(id: number) {
  return new InlineKeyboard().text("✅ Принять запрос", `accept_request ${id}`).row()
}