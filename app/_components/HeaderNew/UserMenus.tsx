"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaThList } from "react-icons/fa";
interface Props{
      user: {
        id: string;
        email: string;
        first_name: string;
        last_name: string;
    };
}
export default function UserMenu ({user}:Props){
    const router = useRouter();
  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.push("/login"); // redirect to login page
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
    return(
        <ul
  role="menu"
  data-popover="profile-menu"
  data-popover-placement="bottom"
  className="absolute z-10 min-w-[180px] right-0 top-11  rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-sm focus:outline-none"
>
    {/* <div className="absolute top-[-20px] right-1 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-l-transparent border-r-transparent border-b-white shadow-lg "></div> */}
{/*   
  <li>
    <Link href={"/users"}  className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400">
      <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clipRule="evenodd" />
    </svg>
 
    <p className="text-slate-800 font-medium ml-2">
      {user?.first_name}{" "}{user?.last_name} <br />
      {user?.email}
    </p>
    </Link>
  </li> */}

  <li>
    <Link href={"/users"}  className="cursor-pointer text-slate-800 flex w-full text-sm items-center p-3  transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 text-slate-400">
      <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clipRule="evenodd" />
    </svg>
 
    {/* <p className="text-slate-800 font-medium ml-2">
      My Profile
    </p> */}
    <div className="ml-2 flex flex-col overflow-hidden">
      <p className="text-slate-800 font-medium truncate max-w-[130px] text-left">
        {user?.first_name} {user?.last_name}
      </p>
      <p className="text-xs text-slate-500 truncate max-w-[130px]  text-left">
        {user?.email}
      </p>
    </div>
    </Link>
  </li>
  <li
    role="menuitem"
   
  >
    <hr className="border-slate-200" role="menuitem" />
<Link href={'users/orders'}  className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 py-2 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100">
   <FaThList />
 
    <p className="text-slate-800 font-medium ml-2">
    Orders
    </p>
    </Link>
  </li>
  {/* <li
    role="menuitem"
    className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400">
      <path fillRule="evenodd" d="M1 11.27c0-.246.033-.492.099-.73l1.523-5.521A2.75 2.75 0 0 1 5.273 3h9.454a2.75 2.75 0 0 1 2.651 2.019l1.523 5.52c.066.239.099.485.099.732V15a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3.73Zm3.068-5.852A1.25 1.25 0 0 1 5.273 4.5h9.454a1.25 1.25 0 0 1 1.205.918l1.523 5.52c.006.02.01.041.015.062H14a1 1 0 0 0-.86.49l-.606 1.02a1 1 0 0 1-.86.49H8.236a1 1 0 0 1-.894-.553l-.448-.894A1 1 0 0 0 6 11H2.53l.015-.062 1.523-5.52Z" clipRule="evenodd" />
    </svg>
 
    <p className="text-slate-800 font-medium ml-2">
      Inbox
    </p>
  </li> */}
  <li
    role="menuitem"
    className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 py-2 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400">
      <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
    </svg>
 
    <p className="text-slate-800 font-medium ml-2">
      Help
    </p>
  </li>
  <hr className="border-slate-200" role="menuitem" />
  <li
  onClick={handleLogout}
    role="menuitem"
    className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400">
      <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clipRule="evenodd" />
      <path fillRule="evenodd" d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z" clipRule="evenodd" />
    </svg>
 
    <p className="text-slate-800 font-medium ml-2">
      Sign Out
    </p>
  </li>
</ul>
    )
}