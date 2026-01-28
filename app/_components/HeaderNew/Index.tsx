"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useAuth } from "@/context/AuthContext";
import { IconType } from "react-icons";
import {  FiHeart } from "react-icons/fi";
import { TopBar } from "./TopBar";
import Desktop from "./desktop";
import Mobile from "./mobile";
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
  { name: "Blog", href: "/blog" },
  { name: "Faq's", href: "/" },
  { name: "Contact Us", href: "/" },
];

export const sideNavLinks: [string, IconType][] = [
  ["/wishlist", FiHeart],
];

export const HeaderNew = () => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [fixed, setFixed] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 640 });
  const { user } = useAuth();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFixed(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="" ref={sentinelRef}>
        <TopBar />
        <header
          className={`w-full bg-white transition-all duration-300 z-[999] ${
            fixed ? "fixed top-0 left-0  shadow-md" : "absolute"
          }`}
        >
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

              {isDesktop ? (
                <Desktop
                  navLinks={navLinks}
                  sideNavLinks={sideNavLinks}
                  user={user}
                />
              ) : (
                <Mobile
                  navLinks={navLinks}
                  sideNavLinks={sideNavLinks}
                  user={user}
                />
              )}
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
      </div>
    </>
  );
};
