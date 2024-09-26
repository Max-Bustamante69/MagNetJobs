import React, { useState, useEffect, useRef, useMemo } from "react";

import { loadUsers } from "@/utils/LoadUsers";
import Loader from "@/components/ui/loader";
import Image from "next/image";
import Post from "./Post";
import { Tapestry } from "next/font/google";

async function loadPosts(page = 1, limit = 10) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts?page=${page}&page_size=${limit}/`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-store",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts = await response.json();
    console.log("Fetched posts:", posts);
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

function ListPosts({ initialPosts, initialUsers }) {
  const [posts, setPosts] = useState(initialPosts || []);
  const [users, setUsers] = useState(initialUsers || []);
  const [page, setPage] = useState(1); // Start at page 2 since page 1 is preloaded
  const [loading, setLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [error, setError] = useState(null);
  const loader = useRef(null);

  const getUserById = useMemo(
    () => (userId) => {
      const user = users.find((user) => user.id === userId);
      return user ? user.username : "Unknown User";
    },
    [users]
  );

  const fetchMorePosts = async () => {
    if (loading || !hasMorePosts) return;
    setLoading(true);
    try {
      const newPosts = await loadPosts(page);

      console.log("New posts:", newPosts);

      if (newPosts.length === 0) {
        throw new Error("No post where retrieved");
      }

      if (hasMorePosts) {
        if (!newPosts.next) {
          setHasMorePosts(false);
          console.log("No more posts available");
        }

        // Prevent adding duplicate posts
        setPosts((prevPosts) => [...prevPosts, ...newPosts.results]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      setHasMorePosts(false);
      setError(error);
      console.error("Error fetching more posts:", error);
    }
    setLoading(false);
  };

  // Fetch users only on mount, preload posts with SSR/SSG
  useEffect(() => {
    const fetchUsers = async () => {
      const initialUsers = await loadUsers();
      setUsers(initialUsers);
    };
    fetchUsers();
  }, []);

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
        <Post key={post.id} post={post} getUserById={getUserById} />
      ))}
      <div className="error">
        {error && <p>Error fetching more posts: {error.message}</p>}
      </div>
      <div ref={loader} className="loader h-10">
        {!error &&
          (loading ? (
            <Loader />
          ) : (
            !hasMorePosts && <p>No more posts available.</p>
          ))}
      </div>
    </div>
  );
}

export default ListPosts;
