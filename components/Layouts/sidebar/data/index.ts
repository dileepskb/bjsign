import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        child:true,
        items: [
          {
            title: "eCommerce",
            url: "/admin/ecommerce",
          },
        ],
      },
      {
        title: "All Products",
        url: "/admin/allproducts",
        icon: Icons.Product,
        child:true,
        items: [
          {
            title: "Products",
            url: "/admin/allproducts",
          },
          {
            title: "Upload Product",
            url: "/admin/uploadproduct",
          },
        ],
      },
      {
        title: "Category by Image",
        url: "/admin/allcategorybyimage",
        icon: Icons.Image,
        items: [],
      },
      {
        title: "Category",
        url: "/admin/category",
        icon: Icons.Category,
        child:false,
        items: [
          // {
          //   title: "",
          //   url: "/admin/addCategory",
          // }
        ],
      },
       {
        title: "FAQ's",
        url: "/admin/faqs",
        icon: Icons.Faq,
        child:false,
        items: [
          // {
          //   title: "",
          //   url: "/admin/addCategory",
          // }
        ],
      },
        {
        title: "Orders",
        url: "/admin/orders",
        icon: Icons.Orders,
        items: [],
      },
      {
        title: "Mailer",
        url: "/admin/mailer",
        icon: Icons.Mailer,
        items: [],
      },
      {
        title: "blogs",
        url: "/admin/blogs",
        icon: Icons.Blog,
         child:true,
        items: [
          {
        title: "List",
        url: "/admin/blogs",
        items: [],
      },
          {
        title: "Create",
        url: "/admin/blogs/create",
        items: [],
      },
        ],
      },
      
      // {
      //   title: "Calendar",
      //   url: "/calendar",
      //   icon: Icons.Calendar,
      //   items: [],
      // },
      // {
      //   title: "Profile",
      //   url: "/profile",
      //   icon: Icons.User,
      //   items: [],
      // },
      // {
      //   title: "Forms",
      //   icon: Icons.Alphabet,
      //   items: [
      //     {
      //       title: "Form Elements",
      //       url: "/forms/form-elements",
      //     },
      //     {
      //       title: "Form Layout",
      //       url: "/forms/form-layout",
      //     },
      //   ],
      // },
      // {
      //   title: "Tables",
      //   url: "/tables",
      //   icon: Icons.Table,
      //   items: [
      //     {
      //       title: "Tables",
      //       url: "/tables",
      //     },
      //   ],
      // },
      // {
      //   title: "Pages",
      //   icon: Icons.Alphabet,
      //   items: [
      //     {
      //       title: "Settings",
      //       url: "/pages/settings",
      //     },
      //   ],
      // },
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
