"use client";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
  } from "@/components/ui/navigation-menu"
  import Link from 'next/link';
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { HiChatAlt2 } from "react-icons/hi";
  import { HiChatAlt } from "react-icons/hi";
  import { HiOutlineBell } from "react-icons/hi";
  import { HiNewspaper } from "react-icons/hi2";
  import { HiOutlineBriefcase } from "react-icons/hi2";
  import { Input } from "@/components/ui/input"
  import Image from 'next/image';
  import PublicationForm from "../Publication/PublicationForm";
  import Logo from "./Logo";

  
  function NavBar() {
    return (
      <nav className="flex justify-between items-center px-4">
        {/* Logo Section */}
        <Link href="/">
          <Logo />
        </Link>

        {/* Search Bar in the Center */}
        <div
          id="search-bar"
          className="flex-grow mx-6 flex items-center relative border border-white border-opacity-20 text-md font-bold p-1 rounded-lg max-w-xl transition duration-300 focus-within:border-opacity-80"
        >
          <Input
            className="border-none w-full"
            type="text"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 box p-2 box-content  rounded-full  transition duration-300   hover:stroke-black hover:bg-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>

        {/* Navigation Menu */}
        <NavigationMenu className="flex gap-4">
          <NavigationMenuList className="flex items-center gap-4">
            {/* Publication */}
            <NavigationMenuItem>
              <PublicationForm />
            </NavigationMenuItem>

            {/* Private Chat */}
            <NavigationMenuItem>
              <Link href="/chat" legacyBehavior passHref>
                <NavigationMenuLink>
                  <HiChatAlt2 size={"35px"} color="#414141" />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Forum */}
            <NavigationMenuItem>
              <Link href="/forum" legacyBehavior passHref>
                <NavigationMenuLink>
                  <HiChatAlt size={"35px"} color="#414141" />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Notifications */}
            <NavigationMenuItem>
              <Link href="/notification" legacyBehavior passHref>
                <NavigationMenuLink>
                  <HiOutlineBell size={"35px"} color="#414141" />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* News Section */}
            <NavigationMenuItem>
              <Link href="/news" legacyBehavior passHref>
                <NavigationMenuLink>
                  <HiNewspaper size={"35px"} color="#414141" />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Magneto Jobs Network */}
            <NavigationMenuItem>
              <Link href="/jobs" legacyBehavior passHref>
                <NavigationMenuLink>
                  <HiOutlineBriefcase size={"35px"} color="#414141" />
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
      </nav>
    );
}

export default NavBar;

