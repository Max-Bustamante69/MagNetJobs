"use client";

import React, { useState, useEffect, useRef } from "react";
import Loader from "@/components/ui/loader";
import Post from "./Post";
import loadPosts from "@/utils/LoadPosts";
import { useUser } from "@/app/(main)/SessionProvider";



function ListPosts({ initialPosts }) {

  const user  = useUser();
  

  const [posts, setPosts] = useState(initialPosts || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [error, setError] = useState(null);
  const loader = useRef(null);
  

  const fetchMorePosts = async () => {
    if (loading || !hasMorePosts) return; // Prevent fetching if already loading or no more posts
    setLoading(true);
    try {
      console.log(user.id);
      const response = await loadPosts(user.id, page);
      console.log(response);
      const newPosts = response.results;

      if (!response.next) {
        setHasMorePosts(false);
      }

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setHasMorePosts(false);
      setError(error);
      console.error("Error fetching more posts:", error);
    } finally {
      setLoading(false); // Ensure loading state is reset after fetch
    }
  };

  // Infinite scroll handler
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          fetchMorePosts();
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loading]);

  return (
    <div className="flex flex-col items-center my-12">
      {posts.map((post) => (
        <Post key={post.id} post={post} isLoading={loading} />
      ))}
      <div className="error">
        {error && <p>Error fetching more posts: {error.message}</p>}
      </div>
      <div ref={loader} className="loader h-10">
        {!error && loading && <Loader />}
        {!error && !loading && !hasMorePosts && <p>No more posts available.</p>}
      </div>
    </div>
  );
}

export default ListPosts;
