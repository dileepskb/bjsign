// app/layout.tsx
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: [
    "100",
    "300",
    "400",
    "700",
    "900",
  ],
  style: ["normal", "italic"],
  display: "swap",
});
import { CartProvider } from "@/context/CartContext";
import Footer from "./_components/Footer";
import { HeaderNew } from "./_components/HeaderNew/Index";
import Newsletter from "./_components/NewsLetter/Newsletter";
import "./globals.css";
// import Header from "./Header";
import Providers from "./providers";
import { AuthProvider } from "@/context/AuthContext";
import { SessionProvider } from "@/context/SessionContext";
import { MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
export const metadata : Metadata =  {
  title: "BJ Sign World",
  description: "this is ecommerce product base company",
  keywords:"printing"
};
export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fb923c' },
    { media: '(prefers-color-scheme: dark)', color: '#fb923c' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lato.className}`}>
        <SessionProvider>
        <CartProvider>
          <AuthProvider>
            <Providers>
              <div className="min-h-screen flex flex-col">
                <HeaderNew />
                {/* <Header /> */}
               <MantineProvider> <main className="flex-1">{children}</main></MantineProvider>
                <Newsletter />
                <Footer />
              </div>
            </Providers>
          </AuthProvider>
        </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
