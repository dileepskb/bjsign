import { useEffect, useRef, useState } from "react";
import { NavLink } from "./Index";
import Link from "next/link";
import { FiUser, FiHeart, FiMenu } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import Search from "./Search";
import AddToCart from "../AddToCart/AddToCart";
import Image from "next/image";
import Notification from "@/components/Notification/Notification";
import UserMenu from "./UserMenus";
import { IconType } from "react-icons";

type SideNavLink = [string, IconType];

type User = {
  email?: string;
  // add more fields if needed
};

interface DesktopProps {
  navLinks: NavLink[];
  sideNavLinks: SideNavLink[];
  user: User | null;
}

export default function Desktop({
  navLinks,
  sideNavLinks,
  user,
}: DesktopProps) {
  const [showUserMenu, setShowUserName] = useState<boolean>(false);
  const [hoveredNavLink, setHoveredNavLink] = useState<NavLink | null>();

  const handleShowMenu = (navLink: NavLink) => setHoveredNavLink(navLink);
  const handleCloseMenu = () => setHoveredNavLink(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserName(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="flex w-full items-center">
      <ul className="hidden h-full md:flex">
        {navLinks.map((item: NavLink, index: number) => (
          <li
            className={`font-medium text-neutral-700 transition-colors ${
              hoveredNavLink === item && "bg-gray-100 text-black"
            }`}
            key={index}
            onMouseEnter={() => handleShowMenu(item)}
            onMouseLeave={handleCloseMenu}
          >
            <Link
              href={item.href}
              className="flex h-full items-center px-3 relative uppercase text-[13px]"
              onClick={handleCloseMenu}
            >
              {item.name}
              {item.collapsible && (
                <span className="ml-1">
                  <IoIosArrowDown />
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="ml-auto items-center md:flex">
        <Search />
        {sideNavLinks.map(([url, Icon]) => (
          <Link key={url} href={url} className="ml-5 hidden md:block">
            <Icon
              className="text-neutral-700 transition-colors hover:text-violet-700"
              size="20px"
            />
          </Link>
        ))}
        <AddToCart />
        {user !== null ? (
          <div className="flex">
            <div ref={menuRef}>
              <button
                className="ml-5 hidden rounded-full border border-gray-300 p-[2px] md:block relative"
                onClick={() => setShowUserName((prev) => !prev)}
              >
                <Image
                  src={"/images/users/blank-profile.png"}
                  alt="user profile image"
                  width={26}
                  height={26}
                  className="overflow-hidden rounded-full"
                  quality={100}
                />
                {showUserMenu && <UserMenu user={user} />}
              </button>
            </div>
            {user?.email === "admin@bjsignworld.com" && (
              <Notification user={user} />
            )}
          </div>
        ) : (
          <Link href={"/login"} className="ml-5 hidden md:block">
            <FiUser
              className="text-neutral-700 transition-colors hover:text-violet-700"
              size="20px"
            />
          </Link>
        )}
      </ul>
    </div>
  );
}
