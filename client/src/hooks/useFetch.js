import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL, PREFIX_USER } from "../config/config";
import { AxiosInstance } from "../services/api";

export default function useFetch({ queryKey, endPoint, options }) {
  const token = localStorage.getItem("token");
  const { data, isLoading, isError, error } = useQuery({
    queryKey,
    queryFn: () => getPostDetails(endPoint),
    ...options,
  });

  async function getPostDetails(endPoint) {
    try {
      const res = await AxiosInstance.get(endPoint);
      return res.data;
    } catch (error) {
      console.log(error.response);
      throw error
    }
  }

  return { data, isLoading, isError, error };
}
