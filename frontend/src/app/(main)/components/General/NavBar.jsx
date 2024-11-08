"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HiChatAlt2 } from "react-icons/hi";
import { HiChatAlt } from "react-icons/hi";
import { HiOutlineBell } from "react-icons/hi";
import { HiNewspaper } from "react-icons/hi2";
import { HiOutlineBriefcase } from "react-icons/hi2";
import Image from "next/image";
import PublicationForm from "../Publication/PublicationForm";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Icons from "./Icons";
import { usePathname } from "next/navigation";
import { useState } from 'react';
import { useUser } from "@/app/(main)/SessionProvider";



function NavBar() {

  const {username} = useUser();


  const pathname = usePathname();
  const showSearch = !pathname.includes("/profile");

  const [isMenuOpen, setIsMenuOpen] = useState(false);


 return (
   <nav className="flex w-full items-start justify-between">
     {/* Logo Section */}
     <div className="flex w-1/3">
       <Link href="/">
         <Logo />
       </Link>
     </div>

     {/* Search Bar in the Center */}
     {showSearch && (
       <div className="flex w-1/3 justify-center">
         <SearchBar />
       </div>
     )}

     {/* Botón de Menú Hamburger (aparece en pantallas menores a xl) */}
     <div className="flex w-1/3 justify-end xl:hidden">
       <button
         onClick={() => setIsMenuOpen(!isMenuOpen)}
         className="inline-flex items-center justify-center p-2 w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
       >
         <span className="sr-only">Open main menu</span>
         <svg
           className="w-5 h-5"
           aria-hidden="true"
           xmlns="http://www.w3.org/2000/svg"
           fill="none"
           viewBox="0 0 17 14"
         >
           <path
             stroke="currentColor"
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth="2"
             d="M1 1h15M1 7h15M1 13h15"
           />
         </svg>
       </button>
     </div>

     {/* Menú de Navegación (visible en pantallas xl y más grandes) */}
     <div className="hidden xl:flex w-1/3 justify-end">
       <NavigationMenu className="flex justify-end gap-4">
         <NavigationMenuList className="flex items-center gap-4">
           {/* Publication */}
           <NavigationMenuItem>
             <PublicationForm />
           </NavigationMenuItem>

           {/* Private Chat */}
           <NavigationMenuItem>
             <Link href="/chat" legacyBehavior passHref>
               <NavigationMenuLink>
                 <Icons IconName={HiChatAlt2} />
               </NavigationMenuLink>
             </Link>
           </NavigationMenuItem>

           {/* Forum */}
           <NavigationMenuItem>
             <Link href="/forum" legacyBehavior passHref>
               <NavigationMenuLink>
                 <Icons IconName={HiChatAlt} />
               </NavigationMenuLink>
             </Link>
           </NavigationMenuItem>

           {/* Notifications */}
           <NavigationMenuItem>
             <Link href="/notification" legacyBehavior passHref>
               <NavigationMenuLink>
                 <Icons IconName={HiOutlineBell} />
               </NavigationMenuLink>
             </Link>
           </NavigationMenuItem>

           {/* News Section */}
           <NavigationMenuItem>
             <Link href="/news" legacyBehavior passHref>
               <NavigationMenuLink>
                 <Icons IconName={HiNewspaper} />
               </NavigationMenuLink>
             </Link>
           </NavigationMenuItem>

           {/* Magneto Jobs Network */}
           <NavigationMenuItem>
             <Link href="/jobs" legacyBehavior passHref>
               <NavigationMenuLink>
                 <Icons IconName={HiOutlineBriefcase} />
               </NavigationMenuLink>
             </Link>
           </NavigationMenuItem>

           {/* Profile */}
           <NavigationMenuItem>
             <Link href="/profile" legacyBehavior passHref>
               <NavigationMenuLink>
                 <Avatar className="size-10">
                   <AvatarImage src="https://images.squarespace-cdn.com/content/v1/606d159a953867291018f801/1619987722169-VV6ZASHHZNRBJW9X0PLK/Key_Art_02_layeredjpg.jpg?format=1500w" />
                   <AvatarFallback>CN</AvatarFallback>
                 </Avatar>
               </NavigationMenuLink>
             </Link>
           </NavigationMenuItem>
         </NavigationMenuList>
       </NavigationMenu>
     </div>

     {/* menu Hamburger para cuando el display sea muy small */}
     {isMenuOpen && (
       <div className="absolute top-16 right-4 w-48 bg-black dark:bg-gray-800 xl:hidden z-10">
         <ul className="flex flex-col items-end font-medium p-4 rounded-lg">
           <li>
             <PublicationForm />
           </li>
           <li>
             <Link href="/chat" className="py-2 px-4">
               <Icons IconName={HiChatAlt2} />
             </Link>
           </li>
           <li>
             <Link href="/forum" className="py-2 px-4">
               <Icons IconName={HiChatAlt} />
             </Link>
           </li>
           <li>
             <Link href="/notification" className="py-2 px-4">
               <Icons IconName={HiOutlineBell} />
             </Link>
           </li>
           <li>
             <Link href="/news" className="py-2 px-4">
               <Icons IconName={HiNewspaper} />
             </Link>
           </li>
           <li>
             <Link href="/jobs" className="py-2 px-4">
               <Icons IconName={HiOutlineBriefcase} />
             </Link>
           </li>
           <li>
             <Link href={`/profile/${username}`} legacyBehavior passHref>
               <Avatar className="size-10">
                 <AvatarImage src="https://images.squarespace-cdn.com/content/v1/606d159a953867291018f801/1619987722169-VV6ZASHHZNRBJW9X0PLK/Key_Art_02_layeredjpg.jpg?format=1500w" />
                 <AvatarFallback>CN</AvatarFallback>
               </Avatar>
             </Link>
           </li>
         </ul>
       </div>
     )}
   </nav>
 );
}

export default NavBar;
