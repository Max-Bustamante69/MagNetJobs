'use client';

import Posts from '../app/components/Feed/InfiniteScroll'
export default function Home() {

  return (
  
    <div className='h-dvh flex flex-col items-center justify-center'>


        
      <center><h1 className="p-4  ">Home Page</h1></center>
      <Posts />

     
        
    </div> 
  );
}
