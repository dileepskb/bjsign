// app/layout.tsx
import Footer from "./_components/Footer";
import { HeaderNew } from "./_components/HeaderNew/Index";
import Newsletter from "./_components/NewsLetter/Newsletter";
import "./globals.css";
// import Header from "./Header";
import Providers from "./providers";

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
        <Providers>
          <div className="min-h-screen flex flex-col">
            <HeaderNew />
            {/* <Header /> */}
            <main className="flex-1">{children}</main>
            <Newsletter />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
