import { toast } from "react-toastify";

export const extractErrorMessage = (error) => {
  const message = error?.response?.data?.message;
  console.log(error);
  if (!message) return "Something wrong";
  console.log(message);
  return Array.isArray(message)
    ? `${message[0].path}: ${message[0].message}`
    : message;
};

export const ErrorToast = (error) => {
  toast.error(extractErrorMessage(error), { theme: "dark", autoClose: 2000 });
  console.log(extractErrorMessage(error));
};
