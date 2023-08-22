// Imports
import { MainFooter, MainNavbar } from "@components";
import { ReactNode } from "react";
import "@styles/globals.css";
import { Inter } from "next/font/google";
import { cn } from "@lib/utils";
import { Toaster } from "@components/ui/toast/Toaster";
import Providers from "@components/common/Providers";

// Types
interface props {
  children: ReactNode;
}

// Metadata
export const metadata = {
  title: "Breadit",
  description: "A try to make a reddit clone",
};

// Font
const inter = Inter({ subsets: ["latin"] });

// Layout
const RootLayout = ({ children }: props) => {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen flex flex-col antialiased bg-slate-200",
          inter.className
        )}
      >
        <Providers>
          <MainNavbar />
          <main className="flex-1">{children}</main>
          <MainFooter />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
