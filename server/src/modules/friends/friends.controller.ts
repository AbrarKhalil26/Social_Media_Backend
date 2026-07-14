import { Router } from "express";
import * as FriendValidation from "./friends.validation";
import { validation } from "../../common/middleware/validation";
import { authentication } from "../../common/middleware/authentication";
import FriendsService from "./friends.service";
import friendsService from "./friends.service";

const friendRouter = Router();
// --------------------------------
// Get -------------------------
friendRouter.get("/incoming", authentication, FriendsService.getIncoming);
friendRouter.get("/outgoing", authentication, FriendsService.getOutgoing);
friendRouter.get(
  "/suggested-friends",
  authentication,
  FriendsService.suggestedFriends,
);

// --------------------------------
// Create -------------------------
friendRouter.post(
  "/:receiverId",
  authentication,
  validation(FriendValidation.sendFriendRequestSchema),
  FriendsService.sendRequest,
);

// --------------------------------
// Patch -------------------------
friendRouter.patch(
  "/:requestId/accept",
  authentication,
  validation(FriendValidation.deleteFriendRequestSchema),
  friendsService.acceptRequest,
);
friendRouter.patch(
  "/:requestId/reject",
  authentication,
  validation(FriendValidation.deleteFriendRequestSchema),
  FriendsService.rejectRequest,
);

// --------------------------------
// Delete -------------------------
friendRouter.delete(
  "/:requestId/cancel",
  authentication,
  validation(FriendValidation.deleteFriendRequestSchema),
  friendsService.cancelRequest,
);
friendRouter.delete(
  "/:requestId",
  authentication,
  validation(FriendValidation.deleteFriendRequestSchema),
  FriendsService.deleteRequest,
);

export default friendRouter;
