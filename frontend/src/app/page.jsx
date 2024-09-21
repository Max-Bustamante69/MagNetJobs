'use client';

import ListPosts from '../app/components/Feed/InfiniteScroll'
export default function Home() {

  return (
  
    <div className='h-dvh flex flex-col '>


        
      <center><h1 className="p-4  ">Home Page</h1></center>
      <ListPosts />

     
        
    </div> 
  );
}
