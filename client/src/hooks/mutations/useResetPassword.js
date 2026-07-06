import { useMutation } from "@tanstack/react-query";
import { resetPassService } from "../../services/auth.service";
import { useAuth } from "../useAuth";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../lib/response.error";

export const useResetPassword = () => {
  const { verificationData, setVerificationData } = useAuth();

  return useMutation({
    mutationFn: resetPassService,
    onSuccess: (res) => {
      sessionStorage.removeItem("verificationData");
      toast.success(res.message, { theme: "dark", autoClose: 2000 });
      navigate("/auth/login");
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err), { theme: "dark", autoClose: 2000 });
    },
  });
};
