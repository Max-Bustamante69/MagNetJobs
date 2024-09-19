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
  import PublicationForm from "../Publication/PublicationForm";

  
  function NavBar() {
    return (
        <div style={{backgroundColor: "#131313", borderRadius:"5px", boxShadow:"0px 5px 5px black " }}>
            <NavigationMenu >
                <NavigationMenuList >

                    {/* Feed*/}
                    <NavigationMenuItem style={{marginLeft: '30px'}} >
                        <Link href="../../" legacyBehavior passHref>
                            <NavigationMenuLink>
                                <img src="/images/MagNetJobIcon.png" alt="My Icon" style={{ width: '45px', height: '45px' }} />
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    {/*Search input*/}
                    <NavigationMenuItem style={{marginLeft: '800px'}} >
                            <NavigationMenuLink>
                                <Input type="text" placeholder="Search" />
                            </NavigationMenuLink>
                    </NavigationMenuItem>

                    {/*Publication*/}
                    <NavigationMenuItem style={{marginLeft: '30px'}}>
                        <PublicationForm />
                    </NavigationMenuItem>

                    {/*Private chat*/}
                    <NavigationMenuItem style={{marginLeft: '30px'}}>
                        <Link href="../../chat" legacyBehavior passHref> 
                            <NavigationMenuLink>
                                <HiChatAlt2 size={'35px'} color="#414141"/>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    {/*Forum*/}
                    <NavigationMenuItem style={{marginLeft: '30px'}}>
                        <Link href="../../forum" legacyBehavior passHref> 
                            <NavigationMenuLink>
                                <HiChatAlt size={'35px'} color="#414141"/>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem style={{marginLeft: '30px'}}>
                        <Link href="../../notification" legacyBehavior passHref> 
                            <NavigationMenuLink>
                                <HiOutlineBell size={'35px'} color="#414141"/>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    {/*News section*/}
                    <NavigationMenuItem style={{marginLeft: '30px'}}>
                        <Link href="../../news" legacyBehavior passHref> 
                            <NavigationMenuLink>
                                <HiNewspaper size={'35px'} color="#414141"/>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    {/*Magneto jobs network*/}
                    <NavigationMenuItem style={{marginLeft: '30px'}}>
                        <Link href="../../jobs" legacyBehavior passHref> 
                            <NavigationMenuLink>
                                <HiOutlineBriefcase size={'35px'} color="#414141"/>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    {/*Profile*/}
                    <NavigationMenuItem style={{marginLeft: '30px'}}>
                        <Link href="../../profile" legacyBehavior passHref>
                            <NavigationMenuLink>
                                <Avatar  className='size-10'>
                                    <AvatarImage   src="https://images.squarespace-cdn.com/content/v1/606d159a953867291018f801/1619987722169-VV6ZASHHZNRBJW9X0PLK/Key_Art_02_layeredjpg.jpg?format=1500w" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>


                </NavigationMenuList>
            </NavigationMenu>
        </div>
        
        );
}

export default NavBar;

