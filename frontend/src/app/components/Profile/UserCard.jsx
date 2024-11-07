"use client";
import { getUserContext } from "@/utils/GetUserContext";
import Icons from "../General/Icons";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HiOutlinePencilAlt } from "react-icons/hi";
import FollowButton from "../Friends/FollowButton";
import { useEffect, useState } from 'react';
import Loader from "@/components/ui/loader";

function UserCard({ user }) {
  const [userOnSession, setUserOnSession] = useState(null);
  user = {
    id: "c5dswrglyhb5shr2",
    username: "Laurikisa",
    email: "test@beispiel.de",
    avatar_image: null,
    bio: null,
    posts: [14],
    first_name: "Gottfried",
    last_name: "Leibniz",
  };

  // Cargar usuario en sesión cuando el componente se monte
  useEffect(() => {
    async function loadUser() {
      const sessionUser = await getUserContext();
      setUserOnSession(sessionUser);
    }

    loadUser();
  }, []); // Solo ejecutar una vez cuando el componente se monta

  // Asegurarse de que el usuario en sesión se ha cargado
  if (!userOnSession) {
    return <Loader />; // Mostrar un mensaje de carga mientras obtenemos el usuario
  }
    return (
      <div className="relative rounded-xl w-full group">
        <Card className="relative bg-black border-black flex flex-col lg:flex-row justify-around items-center lg:items-start p-4 lg:p-8 z-10">
          <div className="flex flex-col items-center justify-center mb-6 lg:mb-0 lg:mr-12">
            <div className="relative group flex flex-col items-center justify-center">
              <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 bg-white rounded-full absolute top-0 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Avatar className="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44">
                <AvatarImage src="https://images.squarespace-cdn.com/content/v1/606d159a953867291018f801/1619987722169-VV6ZASHHZNRBJW9X0PLK/Key_Art_02_layeredjpg.jpg?format=1500w" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="flex flex-col gap-y-6 lg:gap-y-4 text-center lg:text-left">
            <div className="flex justify-center lg:justify-between items-center lg:items-start mb-4 lg:mb-2">
              <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-semibold">
                {user.username?.toUpperCase()}
              </h2>
              {user.username === userOnSession.username && (
                <Icons IconName={HiOutlinePencilAlt} />
              )}
            </div>
            <div className="flex justify-center lg:justify-start gap-8 lg:gap-12">
              <p className="text-white text-sm sm:text-base lg:text-lg font-semibold">
                <strong className="mr-1">34</strong> Publicaciones
              </p>
              <p className="text-white text-sm sm:text-base lg:text-lg font-semibold">
                <strong className="mr-1">23</strong> Seguidores
              </p>
              <p className="text-white text-sm sm:text-base lg:text-lg font-semibold">
                <strong className="mr-1">43</strong> Seguidos
              </p>
              {user.username !== userOnSession.username && (
                <FollowButton user={user} userOnSession={userOnSession} />
              )}
            </div>
            <div className="flex flex-col gap-2 text-white font-bold">
              <p className="font-normal text-sm sm:text-base lg:text-lg">
                {user.first_name + " " + user.last_name}
              </p>
              <p className="text-sm sm:text-base lg:text-lg">
                {user.employed ? "Empleado" : "Desempleado"}
              </p>
            </div>
          </div>
        </Card>
      </div>

      // from-blue-600 to-emerald-600 bg-clip-text
    );
}

export default UserCard;