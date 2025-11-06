import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Account Setting",
        icon: Icons.HomeIcon,
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
        icon: Icons.Product,
        items: [],
      },
      {
        title: "Payments",
        url: "#",
        icon: Icons.Image,
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
        icon: Icons.Image,
        items: [
           {
            title: "My Coupons",
            url: "#",
          },
          {
            title: "My Review & Rating",
            url: "#",
          },
          {
            title: "All Notification",
            url: "#",
          },
          {
            title: "My Wishlist",
            url: "#",
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
