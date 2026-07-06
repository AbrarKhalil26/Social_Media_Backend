import axios from "axios";
import { BASE_URL, PREFIX_USER } from "../config/config";
import { AxiosInstance } from "./api";
import { data } from "react-router-dom";
import { ON_MODEL_ENUM } from "../constants/enums";

export const createPost = async (data) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("content", data.content);
  formData.append("availability", data.availability);
  formData.append("allowComments", data.allowComments);

  if (data.attachments) formData.append("attachments", data.attachments);
  const res = await AxiosInstance.post("/posts", formData);
  console.log(res);
  return res.data;
};

export const likePostService = async (id, flag) => {
  const query = flag ? `?flag=${flag}` : "";
  const res = await AxiosInstance.patch(`/posts/${id}${query}`);
  return res.data;
};

export const addCommentService = async (id, data) => {
  const res = await AxiosInstance.post(`/posts/${id}/comments`, {
    ...data,
    onModel: ON_MODEL_ENUM.Comment,
  });
  return res.data;
};
