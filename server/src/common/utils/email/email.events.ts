import { EventEmitter } from "node:events";
import { EmailEnum } from "../../enum/email.enum.js";

export const eventEmitter = new EventEmitter();

const handler = async (fn: () => Promise<void>) => {
  await fn();
};

eventEmitter.on(EmailEnum.confirmEmail, handler);
eventEmitter.on(EmailEnum.forgetPassword, handler);
