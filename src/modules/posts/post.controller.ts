import { Router } from "express";
import PostService from "./post.service";
import * as PostValidation from "./post.validation";
import { validation } from "../../common/middleware/validation";
import { authentication } from "../../common/middleware/authentication";
import multerCloud from "../../common/middleware/multer.cloud";
import { Store_Enum } from "../../common/enum/multer.enum";

const postRouter = Router();
// --------------------------------
// Create -------------------------
postRouter.post(
  "/",
  authentication,
  multerCloud({ store_type: Store_Enum.memory }).array("attachments"),
  validation(PostValidation.createPostSchema),
  PostService.createPost,
);

export default postRouter;
