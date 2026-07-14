import * as z from "zod";
import { deleteFriendRequestSchema, sendFriendRequestSchema } from "./friends.validation";

export type SendFriendRequestDTO = z.infer<
  typeof sendFriendRequestSchema.params
>;
export type DeleteFriendRequestDTO = z.infer<
  typeof deleteFriendRequestSchema.params
>;
