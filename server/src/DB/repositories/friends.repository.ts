import type { Model } from "mongoose";
import userModel, { IUser } from "../models/user.model";
import BaseRepository from "./base.repository";
import FriendRequestModel, { IFriendRequest } from "../models/friendRequest.model";

class FriendsRepository extends BaseRepository<IFriendRequest> {
  constructor(protected readonly model: Model<IFriendRequest> = FriendRequestModel) {
    super(model);
  }

}

export default FriendsRepository;
