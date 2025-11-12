// app/layout.tsx
import { CartProvider } from "@/context/CartContext";
import Footer from "./_components/Footer";
import { HeaderNew } from "./_components/HeaderNew/Index";
import Newsletter from "./_components/NewsLetter/Newsletter";
import "./globals.css";
// import Header from "./Header";
import Providers from "./providers";
import { AuthProvider } from "@/context/AuthContext";
import { SessionProvider } from "@/context/SessionContext";

export const metadata = {
  title: "BJ Sign World",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
        <CartProvider>
          <AuthProvider>
            <Providers>
              <div className="min-h-screen flex flex-col">
                <HeaderNew />
                {/* <Header /> */}
                <main className="flex-1">{children}</main>
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
