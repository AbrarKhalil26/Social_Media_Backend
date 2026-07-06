import { useEffect, useState } from "react";
import { formatTime } from "../../lib/formateDate";

export default function CountdownTimer({ onExpire, fallback }) {
  const store = JSON.parse(sessionStorage.getItem("verificationData"));
  const getRemainingTime = () => {
    const endTime = store.createdAt + store.ttl * 1000;
    return Math.max(0, Math.floor((endTime - Date.now()) / 1000));
  };
  const [timeLeft, setTimeLeft] = useState(getRemainingTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getRemainingTime();
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        onExpire?.();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [getRemainingTime, onExpire]);

  if (timeLeft <= 0) return fallback;

  return (
    <p className="justify-self-end">Resend code in {formatTime(timeLeft)}</p>
  );
}
