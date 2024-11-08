"use client"; // Ensure this is a Client Component

import UserCard from "@/app/(main)/components/Profile/UserCard";
import { useUser } from "@/app/(main)/SessionProvider";
import { useEffect, useState, useRef } from "react";
import loadPosts from "@/utils/LoadPosts";
import LoadUser from "@/utils/LoadUser";
import ProfilePostFeed from "@/app/(main)/components/Profile/ProfilePostFeed";
import Loader from "@/components/ui/loader";

function Profile({ params }) {
  const { username } = params || {}; // Parameter to check if it's another user's profile
  const currentUser = useUser(); // Logged-in user
  const [user, setUser] = useState(null); // Profile user data
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startPostIndex, setStartPostIndex] = useState(0);
  const modalRef = useRef(null);

  const isCurrentUserProfile = !username || currentUser?.username === username;

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      setIsLoading(true);
      const profileUser = isCurrentUserProfile
        ? currentUser
        : await LoadUser(username);
      if (profileUser) {
        setUser(profileUser);
        const response = await loadPosts(profileUser.id, 1, true);
        setPosts(response.results);
      }
      setIsLoading(false);
    };

    fetchUserAndPosts();
  }, [username, currentUser]);

  const openModal = (index) => {
    setStartPostIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-y-10 relative">
      <section className="w-2/3 2xl:w-1/2 mt-12 flex flex-col items-center gap-12">
        <h2 className="font-extrabold text-7xl">
          {isCurrentUserProfile ? "Your Profile" : `${user.username}'s Profile`}
        </h2>
        <UserCard user={user} />

        {!isCurrentUserProfile && (
          <article className="flex w-full gap-2 justify-center">
            {[...Array(4)].map((_, i) => (
              <img
                key={i}
                className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                src={`/path/to/avatar${i + 1}.jpg`}
                alt="Avatar"
              />
            ))}
          </article>
        )}
      </section>

      <section className="w-2/3 2xl:w-1/2 border-t border-white border-opacity-15">
        <div className="flex justify-center gap-12 py-4 border-t border-white">
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
              />
            </svg>
            <p className="text-xs">POSTS</p>
          </div>
          <div className="flex gap-2 items-center">
            {/* SVG icon for SAVED */}
            <p className="text-xs">SAVED</p>
          </div>
          <div className="flex gap-2 items-center">
            {/* SVG icon for LIKES */}
            <p className="text-xs">LIKES</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post, index) => (
            <div key={post.id} onClick={() => openModal(index)}>
              <img
                className="h-auto max-w-full rounded-lg cursor-pointer"
                src={post.image}
                alt="Post thumbnail"
              />
            </div>
          ))}
        </div>
      </section>

      <ProfilePostFeed
        ref={modalRef}
        posts={posts}
        startPostIndex={startPostIndex}
        isModalOpen={isModalOpen}
        onClose={closeModal}
        user={user}
      />
    </div>
  );
}

export default Profile;
