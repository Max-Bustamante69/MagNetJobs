"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/(main)/components/General/NavBar";
import { usePathname } from "next/navigation";


const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>

         
          {children}

      </body>
    </html>
  );
}
