





import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";
import { UserSidebar } from "@/components/Layouts/UserSideBar";

export const metadata: Metadata = {
  title: {
    template: "Bj Sing World Dashboard Admin",
    default: "Bj Sing World Dashboard Admin",
  },
  description:
    "Next.js admin dashboard toolkit with 200+ templates, UI components, and integrations for fast dashboard development.",
};

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    // <html lang="en" suppressHydrationWarning>
    //   <body>
         <Providers>
        
          <NextTopLoader color="#5750F1" showSpinner={false} />

          <div className="flex min-h-screen container mx-auto">
            <UserSidebar />

            <div className="w-full bg-gray-50 dark:bg-[#020d1a]">
              {/* <Header /> */}

              <div className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden px-4 py-5">
                {children}
              </div>
            </div>
          </div>
       
         </Providers>
    //   </body>
    // </html>
  );
}
