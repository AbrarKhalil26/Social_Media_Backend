import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL, PREFIX_USER } from "../config/config";
import { AxiosInstance } from "../services/api";

export default function useFetch({ queryKey, endPoint, options }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey,
    queryFn: () => Get(endPoint),
    staleTime: 0,
    ...options,
  });

  async function Get(endPoint) {
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
