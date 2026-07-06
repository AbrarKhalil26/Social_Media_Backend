import { useMutation } from "@tanstack/react-query";
import { loginService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../useAuth";
import { extractErrorMessage } from "../../lib/response.error";
import { toast } from "react-toastify";

export const useLogin = ({ reset }) => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginService,
    onSuccess: (res) => {
      reset();
      localStorage.setItem("token", res.data.access_token);
      setToken(res.data.access_token);
      toast.success(res.message, { theme: "dark", autoClose: 2000 });
      navigate("/");
    },
    onError: (err) => {
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
