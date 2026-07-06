import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {} from "react-router-dom";
export default function AuthLayout() {
  return (
    <main
      className="dark:bg-base dark:text-neutral-100 min-h-screen flex flex-col relative before:pointer-events-none before:absolute before:-top-50  before:-left-50  before:w-125  before:h-125
               before:bg-[radial-gradient(circle,#f5b94222,transparent_70%)]"
    >
      <div className="p-5 w-full sm:w-fit">
        <NavLink as={Link} to="/">
          <span className="inline-block animate-[mirrorFlip_4s_0.5s_infinite_ease-in-out] font-logo self-center whitespace-nowrap text-xl p-2 font-semibold bg-[linear-gradient(60deg,red,yellow,red,yellow,red)] bg-clip-text text-transparent">
            Kudo
          </span>
        </NavLink>
      </div>
      <div className="py-5">
        <Outlet />
      </div>
    </main>
  );
}
