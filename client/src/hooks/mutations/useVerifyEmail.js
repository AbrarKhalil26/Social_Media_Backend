import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  resendOtpService,
  verifyEmailService,
} from "../../services/auth.service";
import { extractErrorMessage } from "../../lib/response.error";

export const useVerifyEmail = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: verifyEmailService,
    onSuccess: (res) => {
      sessionStorage.removeItem("verificationData");
      toast.success(res.message, { theme: "dark", autoClose: 2000 });
      navigate("/auth/login");
    },
    onError: (err) => {
      console.log(err.response.data);
      
      toast.error(extractErrorMessage(err), { theme: "dark", autoClose: 2000 });
    },
  });
};

export const useSendOtp = () =>
  useMutation({
    mutationFn: resendOtpService,
    onSuccess: (res) => {
      toast.success(res.message, { theme: "dark", autoClose: 2000 });
      sessionStorage.setItem(
        "verificationData",
        JSON.stringify({ ...res.data, createdAt: Date.now() }),
      );
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err), { theme: "dark", autoClose: 2000 });
    },
  });
