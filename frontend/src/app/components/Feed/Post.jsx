import Image from "next/image";
import formatDate from "@/utils/FormatDate";
import formatTimeAgo from "@/utils/FormatTimeAgo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import fetcher from "@/utils/fetcher";
import Loader from "@/components/ui/loader";
import useSWR from "swr";
import { SkeletonCard } from "@/components/SkeletonCard";


function Post({ post, isLoading }) {
  // Using the user ID directly from the post to fetch user data
  const { data: user, error } = useSWR(
    () =>
      post.user
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${post.user}`
        : null,
    fetcher
  );

  // Handle loading and error states for user data
  if (isLoading || !user) return <SkeletonCard className='w-full'/> // Show loader if parent is loading or user data is not yet fetched
  if (error) return <p>Error loading user</p>;

  return (
    <article className="border-b border-white border-opacity-20 py-8 mb-2 w-1/3 flex flex-col justify-around space-y-3">
      <div id="profile" className="flex gap-4 items-end">
        <Avatar>
          <AvatarImage
            src={
              user.avatar ||
              "https://images.squarespace-cdn.com/content/v1/606d159a953867291018f801/1619987722169-VV6ZASHHZNRBJW9X0PLK/Key_Art_02_layeredjpg.jpg?format=1500w"
            }
            alt="User avatar"
          />
          <AvatarFallback>{user.username}</AvatarFallback>
        </Avatar>
        <h1 className="text-lg capitalize font-semibold hover:underline">
          {user.username}
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
      <div id="post-actions">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8 hover:stroke-red-600 transition duration-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </div>
      <h2>{post.content}</h2>
      <p className="font-extralight text-xs">{formatDate(post.created_at)}</p>
    </article>
  );
}

export default Post;
