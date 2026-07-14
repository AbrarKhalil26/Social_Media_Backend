import mongoose, { model, Schema, Types } from "mongoose";
import { FriendRequestEnum } from "../../common/enum/user.enum";

export interface IFriendRequest {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  status?: FriendRequestEnum;
}

const friendRequestSchema = new Schema(
  {
    sender: {
      type: Types.ObjectId,
      ref: "User",
      require: true,
    },
    receiver: {
      type: Types.ObjectId,
      ref: "User",
      require: true,
    },
    status: {
      type: String,
      enum: FriendRequestEnum,
      default: FriendRequestEnum.pending,
    },
  },
  {
    timestamps: true,
  },
);

// to prevent duplicate friend requests between the same sender and receiver
friendRequestSchema.index({ sender: 1, receiver: 1 }, { unique: true });
const FriendRequestModel =
  mongoose.models.FriendRequest ||
  mongoose.model<IFriendRequest>("FriendRequest", friendRequestSchema);

export default FriendRequestModel;
