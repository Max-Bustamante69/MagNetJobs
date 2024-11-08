// ProfilePostFeed.js

import { useState, useEffect } from "react";
import Post from "@/app/(main)/components/Feed/Post";

function ProfilePostFeed({
  posts,
  startPostIndex,
  isModalOpen,
  onClose,
  user,
}) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      setShowModal(true);
    } else {
      setTimeout(() => setShowModal(false), 300); // Match transition duration for fade-out
    }
  }, [isModalOpen]);

  return (
    <>
      {showModal && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50 transition-opacity duration-300 ${
            isModalOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose} // Close modal on outside click
        >
          <div
            className={`bg-black p-4 rounded-lg max-w-xl w-full relative overflow-auto h-3/4 flex flex-col items-start justify-between transform transition-transform duration-300 ${
              isModalOpen ? "scale-100" : "scale-95"
            }`}
            onClick={(e) => e.stopPropagation()} // Prevents modal close on inside click
          >
            <div className="py-6 grid grid-cols-3 justify-around w-full">
              <button onClick={onClose}>
                <svg
                  data-testid="geist-icon"
                  height="16"
                  strokeLinejoin="round"
                  viewBox="0 0 16 16"
                  width="16"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.46966 13.7803L6.99999 14.3107L8.06065 13.25L7.53032 12.7197L3.56065 8.75001H14.25H15V7.25001H14.25H3.56065L7.53032 3.28034L8.06065 2.75001L6.99999 1.68935L6.46966 2.21968L1.39644 7.2929C1.00592 7.68342 1.00592 8.31659 1.39644 8.70711L6.46966 13.7803Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
              <h2 className="text-lg text-center font-bold">
                {user.username}`s Posts
              </h2>
            </div>
            <div className="scroll-snap-y snap-mandatory overflow-y-scroll bg-black h-full no-scrollbar">
              {posts.map((post, index) => (
                <div
                  key={post.id}
                  className={`snap-start bg-black ${
                    index === startPostIndex ? "scroll-mt-0" : ""
                  }`}
                  ref={(el) => {
                    if (index === startPostIndex && el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                >
                  <Post className="w-full" post={post} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePostFeed;
