export const extractErrorMessage = (error) => {
  const message = error?.response?.data?.message;
  if (!message) return "Something wrong";
  console.log(message);
  return Array.isArray(message)
    ? `${message[0].path}: ${message[0].message}`
    : message;
};
