import { NextFunction, Request, Response } from "express";
import PostRepository from "../../DB/repositories/post.repository";
import UserRepository from "../../DB/repositories/user.repository";
import CommentRepository from "../../DB/repositories/comment.repository";
import { successResponse } from "../../common/utils/response.success";
import { S3Service } from "../../common/service/s3.service";
import redisService from "../../common/service/redis.service";
import notificationService from "../../common/service/notification.service";
import { AppError } from "../../common/utils/general-error-handler";
import { Types } from "mongoose";

class UserService {
  private readonly _commentRepo = new CommentRepository();
  private readonly _postRepo = new PostRepository();
  private readonly _userRepo = new UserRepository();
  private readonly _s3Service = new S3Service();
  private readonly _redisService = redisService;
  private readonly _notificationService = notificationService;

  constructor() {}

  // -----------------------------
  getUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as { id: string };
    console.log(id);
    
    const user = await this._userRepo.findOne({
      filter: { _id: id },
      options: { populate:[{path: "posts"}] },
    });
    if (!user) throw new AppError("User not found.");
    successResponse({ res, data: user });
  };

  // -----------------------------
  getProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this._userRepo.findOne({
      filter: { _id: req.user._id as Types.ObjectId },
      options: { populate: [{ path: "friends" }] },
    });
    successResponse({ res, data: { user } });
  };

  
 
}

export default new UserService();
