"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
// import { useTranslation } from 'next-i18next';
// import { Transition } from '@headlessui/react';
import { IconType } from "react-icons";
import { FiUser, FiHeart, FiShoppingBag } from "react-icons/fi";
import { Search } from "./Search";
import { TopBar } from "./TopBar";
// import { MegaMenu } from './MegaMenu';
// import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import UserMenu from "./UserMenus";
import AddToCart from "../AddToCart/AddToCart";
import Notification from "@/components/Notification/Notification";
// import { Collections } from '@/types';
// import { BottomNavigation } from '@/components';

export interface NavLink {
  name:
    | "Home"
    | "View All Products"
    | "About Us"
    | "Blog"
    | "Faq's"
    | "Contact Us";
  href: string;
  collapsible?: boolean;
}

export const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "View All Products", href: "/", collapsible: true },
  { name: "About Us", href: "/aboutus" },
  { name: "Blog", href: "/" },
  { name: "Faq's", href: "/" },
  { name: "Contact Us", href: "/" },
];

export const sideNavLinks: [string, IconType][] = [
  ["/wishlist", FiHeart],
  // ["/cart", FiShoppingBag],
  // ['/login', FiUser],
];



export const HeaderNew = () => {
  const { user } = useAuth();
  // const { t } = useTranslation('header');
  const [showUserMenu, setShowUserName] = useState<boolean>(false);
  // const [user, setUser] = useState<User | null>(null);
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

  // useEffect(() => {
  //   fetch("/api/me")
  //     .then((res) => res.json())
  //     .then((data) => setUser(data.user))
  //     .catch(() => setUser(null));
  // }, []);

  // console.log(user)


  const [hoveredNavLink, setHoveredNavLink] = useState<NavLink | null>();

  const handleShowMenu = (navLink: NavLink) => setHoveredNavLink(navLink);
  const handleCloseMenu = () => setHoveredNavLink(null);


  return (
    <>
      <TopBar />

      <header className="sticky top-0 z-[900]">
        <div className=" h-14 bg-white shadow-md shadow-black-200">
          <div className="mx-auto flex h-full items-center px-4 xl:container">
            <div className="mr-5 flex shrink-0 items-center border-r border-r-gray-300 pr-10">
              <Link href="/">
                <Image
                  priority
                  src="/images/logo/logo.png"
                  alt="logo"
                  width={55}
                  height={35}
                  quality={100}
                />
              </Link>
            </div>
            <ul className="hidden h-full md:flex">
              {navLinks.map((item, index) => (
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
              <Search onSearch={(value) => console.log(value)} />
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
                 <Notification user={user} />
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
          {/* <Transition as="div" show={Boolean(hoveredNavLink?.collapsible)}>
          {hoveredNavLink && (
            <MegaMenu
              type={'View All Products'}
              collections={{}}
              onShowMenu={() => handleShowMenu(hoveredNavLink)}
              onCloseMenu={handleCloseMenu}
            />
          )}
        </Transition> */}
        </div>
        {/* <BottomNavigation navLinks={navLinks} collections={collections} /> */}
      </header>
    </>
  );
};
