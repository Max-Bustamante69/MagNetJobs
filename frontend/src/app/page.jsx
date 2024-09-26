'use client';

import ListPosts from '../app/components/Feed/InfiniteScroll'
export default function Home() {

  return (
  
    <div className='h-dvh  flex flex-col content-center'>

      <ListPosts />
      
    </div> 
  );
}
