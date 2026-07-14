import { AxiosInstance } from "./api";

export const getUser = async (id) => {
  const res = await AxiosInstance.get(`/users/${id}`);
  return res;
};
