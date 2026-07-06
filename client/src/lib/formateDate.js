import dayjs from "dayjs";

export const calculateAge = (date) => {
  const birthDate = new Date(date);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export function formatDate(createdAt) {
  return new Date(createdAt).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatPostTime(date) {
  const postDate = dayjs(date);
  const now = dayjs();
  if (postDate.isSame(now, "day")) return postDate.format("h:mm A"); // 9:54 PM
  if (postDate.isSame(now.subtract(1, "day"), "day")) return "Yesterday";
  return postDate.format("MMM D, YYYY"); // Jul 2, 2026
}

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const second = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${second}`;
};
