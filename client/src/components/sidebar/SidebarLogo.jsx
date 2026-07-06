import React from "react";
import { HiOutlineSparkles } from "react-icons/hi";

export default function CustomSidebarLogo() {
  return (
    <>
      {/* <span className="bg-[linear-gradient(60deg,red,yellow,red,yellow,red)] bg-clip-text text-transparent">
                  Kudo
                </span> */}
      <svg width="0" height="0">
        <defs>
          <linearGradient
            id="kudoGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="red" />
            <stop offset="50%" stopColor="#facc15" />
            <stop offset="100%" stopColor="red" />
          </linearGradient>
        </defs>
      </svg>
      <HiOutlineSparkles
        style={{ fill: "url(#kudoGradient)" }}
        className="w-8 h-8 rotate-15"
      />
    </>
  );
}
