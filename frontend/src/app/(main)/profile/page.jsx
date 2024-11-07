"use client"

import UserCard from "@/app/components/Profile/UserCard";
import { useUser } from "../SessionProvider";

 function Profile() {
  {/*Esta carga debe cambiarse por el id del usuario con sesión iniciada*/}
  const {user} = useUser();

  return (
    <div className="flex flex-col items-center gap-y-40">
      <section className="w-2/3 2xl:w-1/2 mt-12 flex flex-col items-center gap-12">
        <h2 className="font-extrabold text-7xl">
          Your <span className="bg-gradient-to-r  bg-clip-text">Profile</span>
        </h2>
        <UserCard user={user} />
      </section>

      <section className="w-2/3 2xl:w-1/2 border-t border-white border-opacity-15">
        <div className="flex justify-center gap-20 pb-4">
          <div className="flex gap-4  border-t border-white py-4 items-center">
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
            <p className="text-s">POSTS</p>
          </div>
          <div className="flex gap-2 border-t border-white py-4 items-center ">
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
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>

            <p className="text-s">SAVED</p>
          </div>
          <div className="flex gap-2  border-t border-white py-4 items-center">
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
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>

            <p className="text-s">LIKES</p>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="grid gap-4">
            <div>
              <img
                class="h-auto max-w-full rounded-lg"
                src="https://i.pinimg.com/originals/57/38/e2/5738e21c98764c8fa1fc1e3a34c0b40a.jpg"
              />
            </div>
            <div>
              <img
                class="h-auto max-w-full rounded-lg"
                src="https://images.alphacoders.com/136/thumb-1920-1361079.png"
              />
            </div>
            <div>
              <img
                class="h-auto max-w-full rounded-lg"
                src="https://www.pixelstalk.net/wp-content/uploads/images6/Cool-Hollow-Knight-Wallpaper-HD.jpg"
              />
            </div>
          </div>
          <div class="grid gap-4">
            <div>
              <img
                class="h-auto max-w-full rounded-lg"
                src="https://e0.pxfuel.com/wallpapers/811/79/desktop-wallpaper-hollow-knight-hollow-knight-phone.jpg"
              />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
