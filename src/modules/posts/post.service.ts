import { NextFunction, Request, Response } from "express";
import PostRepository from "../../DB/repositories/post.repository";
import { Availability_Enum } from "../../common/enum/post-enum";
import { successResponse } from "../../common/utils/response.success";
import { CreatePostDTO } from "./post.dto";
import UserRepository from "../../DB/repositories/user.repository";
import { S3Service } from "../../common/service/s3.service";
import redisService from "../../common/service/redis.service";
import notificationService from "../../common/service/notification.service";
import { AppError } from "../../common/utils/general-error-handler";
import { Types } from "mongoose";
import { Store_Enum } from "../../common/enum/multer.enum";
import { randomUUID } from "node:crypto";

class PostService {
  private readonly _postRepo = new PostRepository();
  private readonly _userModel = new UserRepository();
  private readonly _s3Service = new S3Service();
  private readonly _redisService = redisService;
  private readonly _notificationService = notificationService;

  constructor() {}

  createPost = async (req: Request, res: Response, next: NextFunction) => {
    const { content, tags, allowComments, availability }: CreatePostDTO =
      req.body;
    let mentions: Types.ObjectId[] = [];
    let fcmTokens: string[] = [];
    let urls: string[] = [];
    let folderId = randomUUID();

    if (tags?.length) {
      const mentionsTags = await this._userModel.find({
        filter: { _id: { $in: tags } },
      });
      if (tags.length != mentionsTags.length)
        throw new AppError("Invalid tag id");

      for (const tag of mentionsTags) {
        mentions.push(tag._id);
        (await this._redisService.getFCM(tag._id)).map((token) =>
          fcmTokens.push(token),
        );
      }
    }

    if (req?.files) {
      urls = await this._s3Service.uploadFiles({
        files: req.files as Express.Multer.File[],
        path: `users/${req?.user?._id}/posts/${folderId}`,
        store_type: Store_Enum.memory,
      });
    }

    const post = await this._postRepo.create({
      content: content!,
      attachment: urls,
      createdBy: req.user?._id!,
      tags: mentions,
      allowComments,
      availability,
      folderId,
    });
    if (!post) {
      await this._s3Service.deleteFiles(urls);
      throw new AppError("Failed to create post");
    }
    if (fcmTokens?.length) {
      await this._notificationService.sendNotifications({
        tokens: fcmTokens,
        data: {
          title: "You were mentioned in a post",
          body: `${req.user?.name} mentioned you in a post`,
        }
      })
    }
    successResponse({ res, message: "Post created successfully", data: post });
  };

  getPost = async (req: Request, res: Response, next: NextFunction) => {
    const posts = await this._postRepo.find({
      filter: {
        $or: [
          { availability: Availability_Enum.public },
          {
            availability: Availability_Enum.only_me,
            createdBy: req.user?._id!,
          },
          {
            availability: Availability_Enum.friends,
            createdBy: { $in: [...(req.user?.friends || []), req.user?._id] },
          },
        ],
      },
    });
    successResponse({ res, data: posts });
  };
}

export default new PostService();
