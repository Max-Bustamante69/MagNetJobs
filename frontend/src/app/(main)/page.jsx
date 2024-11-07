"use client"

import ListPosts from '@/app/(main)/components/Feed/InfiniteScroll'
import { useUser } from "@/app/(main)/SessionProvider"


export default function Home() {

  const user  = useUser();

  return (
  
    <div className='h-dvh  flex flex-col content-center'>

      <ListPosts userId={user.id}  />
      
    </div> 
  );
}
