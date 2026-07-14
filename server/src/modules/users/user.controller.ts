import { Router } from "express";
import { authentication } from "../../common/middleware/authentication";
import UserService from "./user.service";

const userRouter = Router();
// --------------------------------
// Get -------------------------
userRouter.get("/profile", authentication, UserService.getProfile);
userRouter.get("/:id", authentication, UserService.getUser);

// --------------------------------
// Create -------------------------

// --------------------------------
// Patch -------------------------

// --------------------------------
// Delete -------------------------

export default userRouter;
