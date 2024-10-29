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
  import Image from 'next/image';
  import PublicationForm from "../Publication/PublicationForm";
  import Logo from "./Logo";
  import SearchBar from "./SearchBar";
  
  function NavBar() {
    return (
      <nav className="flex justify-between items-start px-4">
        {/* Logo Section */}
        <Link href="/">
          <Logo />
        </Link>

        {/* Search Bar in the Center */}
        <SearchBar />

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

