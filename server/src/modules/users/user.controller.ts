import { Router } from "express";
import * as UserValidation from "./user.validation";
import { validation } from "../../common/middleware/validation";
import { authentication } from "../../common/middleware/authentication";
import multerCloud from "../../common/middleware/multer.cloud";
import { Store_Enum } from "../../common/enum/multer.enum";
import commentRouter from "../comments/comment.controller";
import UserService from "./user.service";

const userRouter = Router();
// --------------------------------
// Get -------------------------
userRouter.get("/profile", authentication, UserService.getProfile);
userRouter.get("/:id", authentication, UserService.getUser);

// --------------------------------
// Create -------------------------
userRouter.post("/add-friends", authentication, UserService.addFriends);

// --------------------------------
// Patch -------------------------

// --------------------------------
// Delete -------------------------

export default userRouter;
