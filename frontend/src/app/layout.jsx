"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/General/NavBar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isProfilePage = pathname === "/profile";
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar showSearch={!isProfilePage}/>
        {children}
        </body>
    </html>
  );
}
