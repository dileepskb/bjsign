import * as Icons from "../icons";
import { FaRegUser } from "react-icons/fa";
import { FaThList } from "react-icons/fa";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Account Setting",
        icon: FaRegUser,
        child:true,
        items: [
          {
            title: "Profile Information",
            url: "/users",
          },
          {
            title: "Manage Addresses",
            url: "/users/user_address",
          },
        ],
      },
      {
        title: "My Orders",
        url: "/users/orders",
        icon:FaThList,
        items: [],
      },
      {
        title: "Payments",
        url: "",
        icon: Icons.Image,
        child:true,
        items: [
           {
            title: "Gift Cards",
            url: "#",
          },
          {
            title: "Save UPI",
            url: "#",
          },
          ,
          {
            title: "Save Cards",
            url: "#",
          },
        ],
      },
      {
        title: "My Stuff",
        url: "#",
        child:true,
        icon: Icons.Image,
        items: [
           {
            title: "My Coupons",
            url: "#",
          },
          {
            title: "My Review & Rating",
            url: "/users/review",
          },
          {
            title: "All Notification",
            url: "/users/notifications",
          },
          {
            title: "My Wishlist",
            url: "/users/mywishlist",
          },
        ],
      },
     
    ],
  },
  // {
  //   label: "OTHERS",
  //   items: [
  //     {
  //       title: "Charts",
  //       icon: Icons.PieChart,
  //       items: [
  //         {
  //           title: "Basic Chart",
  //           url: "/charts/basic-chart",
  //         },
  //       ],
  //     },
  //     {
  //       title: "UI Elements",
  //       icon: Icons.FourCircle,
  //       items: [
  //         {
  //           title: "Alerts",
  //           url: "/ui-elements/alerts",
  //         },
  //         {
  //           title: "Buttons",
  //           url: "/ui-elements/buttons",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Authentication",
  //       icon: Icons.Authentication,
  //       items: [
  //         {
  //           title: "Sign In",
  //           url: "/auth/sign-in",
  //         },
  //       ],
  //     },
  //   ],
  // },
];
