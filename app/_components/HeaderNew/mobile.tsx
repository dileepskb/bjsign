import { useEffect, useRef, useState } from "react";
import { NavLink } from "./Index";
import Link from "next/link";
import { FiUser, FiMenu } from "react-icons/fi";
import Search from "./Search";
import AddToCart from "../AddToCart/AddToCart";
import Image from "next/image";
import Notification from "@/components/Notification/Notification";
import UserMenu from "./UserMenus";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";

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


  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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


  useEffect(() => {
  setMobileMenuOpen(false);
}, [pathname]);

  return (
    <div className="flex w-full items-center">
      <ul className="ml-auto items-center flex">
        <Search />
        <button
          className="ml-3 flex items-center md:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <FiMenu size={22} />
        </button>
      </ul>
     {mobileMenuOpen && (
  <div
    className="fixed inset-0 z-[999] bg-black/50 md:hidden"
    onClick={() => setMobileMenuOpen(false)}
  />
)}
        <div 
        onClick={(e) => e.stopPropagation()}
       className={`
        p-3
    fixed w-[250px] shadow-xl h-full top-0  z-[1000] md:hidden
    bg-white
    transform transition-transform duration-300 ease-in-out
    ${mobileMenuOpen ? "right-0 " : " -right-[250px]"}
  `}
        >
          <button
            className="mb-4 text-right w-full"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="bg-black text-white px-2 py-1 rounded">✕</span> 
          </button>

          <ul className="space-y-4">
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex pt-3 mt-3 border-t">
            {sideNavLinks.map(([url, Icon]) => (
              <Link key={url} href={url}>
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
                    className="ml-5  rounded-full border border-gray-300 p-[2px]  relative"
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
              <Link href={"/login"} className="ml-5">
                <FiUser
                  className="text-neutral-700 transition-colors hover:text-violet-700"
                  size="20px"
                />
              </Link>
            )}
          </div>
        </div>
 
    </div>
  );
}
