import { getSocket } from "@/lib/socket";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

interface userData{
  id?:string;
  first_name?:string;
  last_name?:string
  email?:string
}
interface Props{
   user:userData
}

const Notification = ({user}:Props) => {
// const [unreadCount, setUnreadCount] = useState(0);
  const [updateCount, setUpdateCount] = useState(0)
  const [products, setProducts] = useState<any[]>([]);
  const [, setLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const [active, setActive] = useState(false);
  const handle = () => {
    if (active) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await axios.get("/api/protected/allorders");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [reload, updateCount]);

  const unreadCount = products?.filter(
  (item) => item.isRead === "unread"
).length || 0


const readOrder = async (id:string) => {
  try {
    const res = await fetch('/api/protected/read_orders', {
      method: 'POST',              // or 'GET' depending on your API
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }), // remove body if using GET with query param
    });

    if (!res.ok) {
      throw new Error('Request failed');
    }

    const data = await res.json();
    setUpdateCount(data)
    setActive(false)
    // do something with data (setState, etc.)
  } catch (err) {
    console.error(err);
  }
};




  return (
    <div className="relative w-max mx-auto ml-2">
       
      <button
        type="button"
        onClick={() => handle()}
        className="relative w-8 h-8 flex items-center justify-center rounded-full text-white border border-gray-400 outline-none"
      >
       {products?.length > 0 &&  <span className="bg-red-600 -top-2 left-4 text-xs absolute px-1 rounded-full">{unreadCount}</span>}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18px"
          className="cursor-pointer fill-[#999]"
          viewBox="0 0 371.263 371.263"
        >
          <path
            d="M305.402 234.794v-70.54c0-52.396-33.533-98.085-79.702-115.151.539-2.695.838-5.449.838-8.204C226.539 18.324 208.215 0 185.64 0s-40.899 18.324-40.899 40.899c0 2.695.299 5.389.778 7.964-15.868 5.629-30.539 14.551-43.054 26.647-23.593 22.755-36.587 53.354-36.587 86.169v73.115c0 2.575-2.096 4.731-4.731 4.731-22.096 0-40.959 16.647-42.995 37.845-1.138 11.797 2.755 23.533 10.719 32.276 7.904 8.683 19.222 13.713 31.018 13.713h72.217c2.994 26.887 25.869 47.905 53.534 47.905s50.54-21.018 53.534-47.905h72.217c11.797 0 23.114-5.03 31.018-13.713 7.904-8.743 11.797-20.479 10.719-32.276-2.036-21.198-20.958-37.845-42.995-37.845a4.704 4.704 0 0 1-4.731-4.731zM185.64 23.952c9.341 0 16.946 7.605 16.946 16.946 0 .778-.12 1.497-.24 2.275-4.072-.599-8.204-1.018-12.336-1.138-7.126-.24-14.132.24-21.078 1.198-.12-.778-.24-1.497-.24-2.275.002-9.401 7.607-17.006 16.948-17.006zm0 323.358c-14.431 0-26.527-10.3-29.342-23.952h58.683c-2.813 13.653-14.909 23.952-29.341 23.952zm143.655-67.665c.479 5.15-1.138 10.12-4.551 13.892-3.533 3.773-8.204 5.868-13.353 5.868H59.89c-5.15 0-9.82-2.096-13.294-5.868-3.473-3.772-5.09-8.743-4.611-13.892.838-9.042 9.282-16.168 19.162-16.168 15.809 0 28.683-12.874 28.683-28.683v-73.115c0-26.228 10.419-50.719 29.282-68.923 18.024-17.425 41.498-26.887 66.528-26.887 1.198 0 2.335 0 3.533.06 50.839 1.796 92.277 45.929 92.277 98.325v70.54c0 15.809 12.874 28.683 28.683 28.683 9.88 0 18.264 7.126 19.162 16.168z"
            data-original="#000000"
          ></path>
        </svg>
      </button>
      {active && (
        <div
          id="dropdownMenu"
          className="absolute block right-0 shadow-2xl bg-white py-0 z-[1000] min-w-full rounded-lg w-[410px] max-h-[400px] overflow-auto mt-3 border"
        >
          <ul className="divide-y divide-gray-300">
            {products?.map((items, index) => (
              <li onClick={() => readOrder(items.id)} key={index} className={`dropdown-item p-4  hover:bg-white cursor-pointer ${items?.isRead ==="unread" ? 'bg-gray-100' : 'bg-white'}`}>
                <Link href={`/admin/orders/${items.id}`} className="flex items-center">
                <img
                  src="/images/empty.jpg"
                  className="w-12 h-12 rounded-full shrink-0"
                />

                <div className="ml-6">
                  <h3 className="text-sm text-slate-900 font-medium">
                    Your have received order from {items?.user?.first_name} {items?.user?.last_name}
                  </h3>
                  <p className="text-xs text-blue-600 font-medium leading-3 mt-2">
                  {moment(items?.createdAt).fromNow()}
                  </p>
                </div>
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs px-4 pt-4 pb-3 text-center border border-t text-blue-600 font-medium cursor-pointer center">
            <Link href={`/admin/orders/`}>View all Notifications</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Notification;
