import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

export default function GoTopBtn() {
  const [isTop, setIsTop] = useState(true);
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 700) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
    {!isTop &&
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 w-13 h-13 flex justify-center items-center shadow-lg shadow-gray-900 text-2xl border-none rounded-full cursor-pointer bg-primary-900"
      >
        <IoIosArrowUp />
      </button>
    }
    </>
  );
}
