import mongoose, { Types } from "mongoose";

export interface IComment {
  content?: string;
  folderId: string;
  attachments?: string[];
  likes?: Types.ObjectId[];
  tags?: Types.ObjectId[];
  createdBy: Types.ObjectId;
  postId: Types.ObjectId;
  commentId: Types.ObjectId;
}

const commentSchema = new mongoose.Schema<IComment>(
  {
    content: {
      type: String,
      min: 1,
      required: function (this) {
        return !this.attachments?.length;
      },
    },
    attachments: [String],
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: Types.ObjectId,
      ref: "Post",
      required: true,
    },
    commentId: {
      type: Types.ObjectId,
      ref: "Comment",
    },
    tags: [{ type: Types.ObjectId, ref: "User" }],
    likes: [{ type: Types.ObjectId, ref: "User" }],
    folderId: String,

  },
  {
    timestamps: true,
    strict: true,
    strictQuery: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const commentModel =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);

export default commentModel;
