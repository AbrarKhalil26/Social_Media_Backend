import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { registerService } from "../../services/auth.service";
import { extractErrorMessage } from "../../lib/response.error";

export const useRegister = ({ reset }) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerService,
    onSuccess: (res) => {
      reset();
      sessionStorage.setItem(
        "verificationData",
        JSON.stringify({ ...res.data, createdAt: Date.now() }),
      );
      toast.success(res.message, { theme: "dark", autoClose: 2000 });
      navigate("/auth/verify-email");
    },
    onError: (err) => {
      const errorMessage = extractErrorMessage(err);
      toast.error(errorMessage, { theme: "dark", autoClose: 2000 });
    },
  });
};
