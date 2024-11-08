"use client"

import Image from "next/image";
import formatDate from "@/utils/FormatDate";
import formatTimeAgo from "@/utils/FormatTimeAgo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useUser } from "@/utils/GetUserById";
import React, { useState } from "react";
import { useUser as getCurrentUser } from "../../SessionProvider";

const Post = React.memo(function Post({ post, isLoading, className = "" }) {
  const {
    user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUser(post.user);
  const [isLiked, setIsLiked] = useState(false); // Track like state
  const currentUser = getCurrentUser(); // Get current user session
  const previousLike = post.likes.includes(currentUser.id); // Check if user has liked post
  console.log(post.likes, currentUser.id, previousLike);

  if (isLoading || isUserLoading) return <SkeletonCard className="w-full" />; // Show loader if parent is loading or user data is not yet fetched
  if (isUserError) return <p>Error loading user</p>;

  // Function to handle like action
  const handleLike = async () => {
    if(previousLike) return; // Prevent liking post if already liked

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${post.id}/like/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: currentUser.id }), // Include user ID in request body
        }
      );

      if (response.ok) {
        setIsLiked(!isLiked); // Toggle like state
      } else {
        console.error("Failed to like post");
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <article
      className={`border-b border-white border-opacity-20 py-8 mb-2 flex flex-col justify-around space-y-3 ${className}`}
    >
      <div id="profile" className="flex gap-4 items-end">
        <Avatar>
          <AvatarImage
            src={
              user?.avatar ||
              "https://images.squarespace-cdn.com/content/v1/606d159a953867291018f801/1619987722169-VV6ZASHHZNRBJW9X0PLK/Key_Art_02_layeredjpg.jpg?format=1500w"
            }
            alt="User avatar"
          />
          <AvatarFallback>{user?.username}</AvatarFallback>
        </Avatar>
        <h1 className="text-lg capitalize font-semibold hover:underline">
          {user?.username}
        </h1>
        <p className="opacity-60 text-lg">{formatTimeAgo(post.created_at)}</p>
      </div>
      <div className="flex justify-center">
        {post.image && (
          <Image
            src={post.image || "/path/to/fallback-image.jpg"}
            alt="Post image"
            width={500}
            height={300}
            className="w-full h-auto mb-2"
            onError={(e) => {
              e.target.src = "/path/to/fallback-image.jpg";
            }}
            unoptimized={true}
          />
        )}
      </div>
      <div id="post-actions" className="flex items-center space-x-2">
        <p>{post.likes_count}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isLiked ? "red" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-8 hover:stroke-red-600 transition duration-300 cursor-pointer ${
            isLiked || previousLike ? "fill-red-600 stroke-red-600" : ""
          }`}
          onClick={handleLike} // Attach click handler to like button
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
        <span>{isLiked || previousLike ? "Liked" : "Like"}</span>
      </div>
      <h2>{post.content}</h2>
      <p className="font-extralight text-xs">{formatDate(post.created_at)}</p>
    </article>
  );
});

export default Post;
