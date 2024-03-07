import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TanstackProvider } from "@/config/query-config/TanstackProvider";
import { NextAuthProvider } from "@/config/next-auth/NextAuthProviders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative`} suppressHydrationWarning={true}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastContainer />
          <Navbar />
          {children}

          {/* <TanstackProvider>
          <NextAuthProvider>{children}</NextAuthProvider>
        </TanstackProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
