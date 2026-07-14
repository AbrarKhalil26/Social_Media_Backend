import * as z from "zod";
import { generalRules } from "../../common/utils/generalRules";

// Main Field
// =====================

export const sendFriendRequestSchema = {
  params: z.strictObject({
    receiverId: generalRules.id,
  }),
};
export const deleteFriendRequestSchema = {
  params: z.strictObject({
    requestId: generalRules.id,
  }),
};
