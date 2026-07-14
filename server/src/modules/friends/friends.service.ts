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
import FriendsRepository from "../../DB/repositories/friends.repository";
import { DeleteFriendRequestDTO, SendFriendRequestDTO } from "./friends.dto";
import { FriendRequestEnum } from "../../common/enum/user.enum";

class FriendService {
  private readonly _commentRepo = new CommentRepository();
  private readonly _postRepo = new PostRepository();
  private readonly _userRepo = new UserRepository();
  private readonly _friendRepo = new FriendsRepository();
  private readonly _s3Service = new S3Service();
  private readonly _redisService = redisService;
  private readonly _notificationService = notificationService;

  constructor() {}

  // -----------------------------
  getIncoming = async (req: Request, res: Response, next: NextFunction) => {
    const senderId = req.user._id;
    const incoming = await this._friendRepo.find({
      filter: { sender: senderId },
      options: {
        populate: [
          {
            path: "receiver",
            select: "userName profilePic firstName lastName",
          },
        ],
      },
    });
    successResponse({ res, data: incoming });
  };

  // -----------------------------
  getOutgoing = async (req: Request, res: Response, next: NextFunction) => {
    const senderId = req.user._id;
    console.log(senderId);

    const outgoing = await this._friendRepo.find({
      filter: { receiver: senderId },
      options: {
        populate: [
          {
            path: "sender",
            select: "userName profilePic firstName lastName",
          },
        ],
      },
    });
    successResponse({ res, data: outgoing });
  };

  // -----------------------------
  sendRequest = async (
    req: Request<SendFriendRequestDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    const senderId = req.user._id;
    const { receiverId } = req.params;
    if (senderId.toString() === receiverId)
      throw new AppError("You cannot send a friend request to yourself", 400);
    const existing = await this._friendRepo.findOne({
      filter: {
        $or: [
          { sender: senderId!, receiver: receiverId! },
          { sender: receiverId!, receiver: senderId! },
        ],
      },
    });
    if (existing) throw new AppError("Friend request already exists", 400);
    await this._friendRepo.create({
      sender: new Types.ObjectId(senderId),
      receiver: new Types.ObjectId(receiverId),
    });
    successResponse({ res, message: " Request sent successfully" });
  };

  // -----------------------------
  acceptRequest = async (
    req: Request<DeleteFriendRequestDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    const senderId = req.user._id;
    const { requestId } = req.params;
    const request = await this._friendRepo.findById(requestId);
    if (!request) throw new AppError("Friend request not found", 404);
    if (request.receiver.toString() !== senderId.toString())
      throw new AppError(
        "You are not authorized to accept this friend request",
        403,
      );
    if (request.status !== FriendRequestEnum.pending)
      throw new AppError("This request has already been processed", 400);
    await this._userRepo.findByIdAndUpdate({
      id: request.sender,
      update: { $addToSet: { friends: request.receiver } },
    });
    await this._userRepo.findByIdAndUpdate({
      id: request.receiver,
      update: { $addToSet: { friends: request.sender } },
    });
    await this._friendRepo.findByIdAndUpdate({
      id: request._id,
      update: { status: FriendRequestEnum.accepted },
    });
    successResponse({ res, message: "Friend request accepted successfully" });
  };

  // -----------------------------
  cancelRequest = async (
    req: Request<DeleteFriendRequestDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    const senderId = req.user._id;
    const { requestId } = req.params;
    const request = await this._friendRepo.findById(requestId);
    if (!request) throw new AppError("Friend request not found", 404);
    if (request.sender.toString() !== senderId.toString())
      throw new AppError(
        "You are not authorized to cancel this friend request",
        403,
      );
    if (request.status === FriendRequestEnum.pending) {
      await this._friendRepo.findOneAndDelete({
        filter: { _id: requestId },
      });
      successResponse({ res, message: "Friend request canceled successfully" });
      return;
    }
    throw new AppError("This request has already been processed", 400);
  };

  // -----------------------------
  rejectRequest = async (
    req: Request<DeleteFriendRequestDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    const senderId = req.user._id;
    const { requestId } = req.params;
    const request = await this._friendRepo.findById(requestId);
    if (!request) throw new AppError("Friend request not found", 404);
    if (request.receiver.toString() !== senderId.toString())
      throw new AppError(
        "You are not authorized to reject this friend request",
        403,
      );
    if (request.status !== FriendRequestEnum.pending)
      throw new AppError("This request has already been processed", 400);
    await this._friendRepo.findByIdAndUpdate({
      id: request._id,
      update: { status: FriendRequestEnum.rejected },
    });
    successResponse({ res, message: "Friend request rejected successfully" });
  };

  // -----------------------------
  deleteRequest = async (
    req: Request<DeleteFriendRequestDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    const { requestId } = req.params;
    const deletedRequest = await this._friendRepo.findOneAndDelete({
      filter: { _id: requestId },
    });
    if (!deletedRequest) throw new AppError("Friend request not found", 404);
    successResponse({ res, message: " Request deleted successfully" });
  };

  // -----------------------------
  suggestedFriends = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const suggestedFriends = await this._userRepo.find({
      filter: { _id: { $nin: [...req.user?.friends!, req.user._id] } },
      projection: {
        firstName: 1,
        lastName: 1,
        profilePic: 1,
      },
      options: { limit: 10 },
    });
    successResponse({ res, data: suggestedFriends });
  };

  // -----------------------------
  
}

export default new FriendService();
