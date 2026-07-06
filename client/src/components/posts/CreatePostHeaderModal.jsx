import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  ListGroup,
  ListGroupItem,
} from "flowbite-react";
import { TbWorld } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaCommentSlash } from "react-icons/fa";
import { customTheme } from "../../lib/flowbiteTheme";
import Dropdowns from "../shared/Dropdowns";
import { initFlowbite } from "flowbite";

const AVAILABILITY_OPTIONS = [
  { value: "public", label: "Public", icon: TbWorld },
  { value: "only_me", label: "Only Me", icon: FaUserFriends },
  { value: "friends", label: "Friends", icon: FiLock },
];

const COMMENT_OPTIONS = [
  { value: "allow", label: "Allow Comment", icon: FaRegCommentDots },
  { value: "deny", label: "Deny Comment", icon: FiLock },
];

const SettingDropdown = ({
  id,
  value,
  options,
  onChange,
  openDropdown,
  setOpenDropdown,
}) => {
  const currentOpt = options.find((item) => item.value === value);
  return (
    <Dropdowns
      labelDropdown={
        <div className="flex items-center gap-2">
          <currentOpt.icon /> {currentOpt.label}
        </div>
      }
      open={openDropdown === id}
      setOpen={(isOpen) => {
        setOpenDropdown(isOpen ? id : null);
      }}
    >
      {options.map((item, idx) => (
        <li
          key={idx}
          className={`${item.value === value ? "dark:bg-neutral-900 hover:dark:bg-neutral-900" : "dark:bg-neutral-800 hover:bg-neutral-700"} dark:border-none text-[12px] rounded-lg `}
        >
          <button
            value={item.value}
            onClick={() => {
              onChange(item.value);
              setOpenDropdown(null);
            }}
            className="py-2.5 pl-3 pr-15 inline-flex items-center justify-center gap-1 whitespace-nowrap"
          >
            <item.icon className="mr-2" />{" "}
            <span className="capitalize">{item.label}</span>
          </button>
        </li>
      ))}
    </Dropdowns>
  );
};

export default function CreatePostHeaderModal({
  userData,
  availableCurrent,
  setAvailableCurrent,
  allowCommentCurrent,
  setAllowCommentCurrent,
}) {
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <div className="flex items-center gap-3 p-3">
      <Avatar
        alt="User settings"
        img={
          userData?.photo ||
          "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        }
        rounded
      />
      <div>
        <h4 className="text-lg">User Name</h4>
        <div className="flex items-center gap-2">
          <SettingDropdown
            id="availability"
            value={availableCurrent}
            options={AVAILABILITY_OPTIONS}
            onChange={setAvailableCurrent}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
          <SettingDropdown
            id="allow comment"
            value={allowCommentCurrent}
            options={COMMENT_OPTIONS}
            onChange={setAllowCommentCurrent}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
        </div>
      </div>
    </div>
  );
}
