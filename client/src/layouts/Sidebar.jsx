import React, { useState } from "react";
import {
  NavbarBrand,
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarLogo,
} from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { customTheme } from "../lib/flowbiteTheme";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { BsChatText } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { LuUserRound } from "react-icons/lu";
import { HiOutlineSparkles } from "react-icons/hi2";
import CustomSidebarLogo from "../components/sidebar/SidebarLogo";
import { useAuth } from "../hooks/useAuth";

const menu = [
  { title: "home", icon: IoHomeOutline, href: "/" },
  {
    title: "notifications",
    icon: IoMdNotificationsOutline,
    href: "/notifications",
  },
  { title: "messages", icon: BsChatText, href: "/messages" },
  { title: "bookmarks", icon: CiBookmark, href: "/bookmarks" },
  { title: "profile", icon: LuUserRound, href: "/profile" },
];

export default function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, setToken, userData } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/auth/login");
  };
  return (
    <Sidebar aria-label="Default sidebar example" theme={customTheme.sidebar}>
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarLogo as={Link} to="/">
            <CustomSidebarLogo />
          </SidebarLogo>
          {menu.map((item, idx) => (
            <SidebarItem
              key={idx}
              href={item.href}
              icon={item.icon}
              active={location.pathname === item.href}
              title={item.title}
            />
          ))}
        </SidebarItemGroup>
        <SidebarItemGroup>
          <SidebarItem href="#" icon={HiArrowSmRight} onClick={handleLogout}/>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
