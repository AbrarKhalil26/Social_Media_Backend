import axios from "axios";
import { BASE_URL } from "../config/config";
import { AxiosInstance } from "./api";

export const registerService = async (data) => {
  const res = await AxiosInstance.post('/auth/signup', data);
  return res.data;
};

export const verifyEmailService = async (data) => {
  const verificationData = JSON.parse(
    sessionStorage.getItem("verificationData"),
  );
  const res = await AxiosInstance.post('/auth/verify-email', {
    ...data,
    email: verificationData.email,
  });
  return res.data;
};

export const resendOtpService = async (data) => {
  const verificationData = JSON.parse(
    sessionStorage.getItem("verificationData"),
  );
  const res = await AxiosInstance.post('/auth/resend-otp', {
    email: verificationData.email,
  });
  return res.data;
};

export const loginService = async (data) => {
  const res = await AxiosInstance.post("/auth/login", data);
  return res.data;
};

export const forgetPassService = async (data) => {
  const res = await AxiosInstance.patch('/auth/forget-password', data);
  return res.data;
};

export const resetPassService = async (data) => {
  const res = await AxiosInstance.patch('/auth/reset-password', {
    ...data,
    email: verificationData,
  });
  return res.data;
};
