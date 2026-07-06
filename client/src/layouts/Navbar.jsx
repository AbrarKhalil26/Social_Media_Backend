import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { FcHome } from "react-icons/fc";

export default function AppNavbar() {
  const { token, setToken, userData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/auth/login");
  };

  return (
    <Navbar className="flex items-center dark:bg-base rounded-full">
      <NavbarBrand as={Link} to="/">
        <span className="inline-block animate-[mirrorFlip_4s_0.5s_infinite_ease-in-out] font-logo self-center whitespace-nowrap text-xl p-2 font-semibold bg-[linear-gradient(60deg,red,yellow,red,yellow,red)] bg-clip-text text-transparent">
          Kudo
        </span>
      </NavbarBrand>
      <div className="flex md:order-2 gap-4">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img={
                userData?.photo ||
                "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              }
              rounded
            />
          }
        >
          {token ? (
            <>
              {userData && (
                <DropdownHeader>
                  <span className="block text-sm">{userData.name}</span>
                  <span className="block truncate text-sm font-medium">
                    {userData.email}
                  </span>
                </DropdownHeader>
              )}
              <DropdownItem as={Link} to="/profile">
                Profile
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem as="button" onClick={handleLogout}>
                Sign out
              </DropdownItem>
            </>
          ) : (
            <>
              <DropdownItem as={Link} to="/auth/login">
                Login
              </DropdownItem>
              <DropdownItem as={Link} to="/auth/register">
                Register
              </DropdownItem>
            </>
          )}
        </Dropdown>
        {token && <NavbarToggle />}
      </div>
      <NavbarCollapse>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-white font-bold" : "text-gray-400"
          }
        >
          <FcHome size={20}/>
        </NavLink>
        <NavLink
          to="/posts"
          className={({ isActive }) =>
            isActive ? "text-white font-bold" : "text-gray-400"
          }
        >
          Posts
        </NavLink>
      </NavbarCollapse>
    </Navbar>
  );
}
