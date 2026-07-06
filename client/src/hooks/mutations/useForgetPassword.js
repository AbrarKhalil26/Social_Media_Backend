import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../lib/response.error";
import { forgetPassService } from "../../services/auth.service";
import { useAuth } from "../useAuth";

export const useForgetPassword = () => {
  const { setVerificationData } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: forgetPassService,
    onSuccess: (res) => {
      setVerificationData(res.data.email);
      sessionStorage.setItem(
        "verificationData",
        JSON.stringify({ ...res.data, createdAt: Date.now() }),
      );
      navigate("/auth/reset-password");
    },
    onError: (err) => {
      console.log(err);

      if (err.response?.status === 403) {
        sessionStorage.setItem(
          "verificationData",
          JSON.stringify({ ...err.response.data.data, createdAt: Date.now() }),
        );
        navigate("/auth/verify-email");
      }
      const errorMessage = extractErrorMessage(err);
      toast.error(errorMessage, { theme: "dark", autoClose: 2000 });
    },
  });
};
