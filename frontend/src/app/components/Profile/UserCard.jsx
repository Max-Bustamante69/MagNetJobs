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
        <Card className="relative bg-black border-black flex justify-around p-8 z-10 ">
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <div className="size-2/3 h-auto bg-white rounded-full absolute top-0 blur-lg"></div>
              <Avatar className="size-2/3 h-auto">
                <AvatarImage src="https://images.squarespace-cdn.com/content/v1/606d159a953867291018f801/1619987722169-VV6ZASHHZNRBJW9X0PLK/Key_Art_02_layeredjpg.jpg?format=1500w" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex justify-between">
              <h2 className="text-white text-xl font-semibold">
                {user.username?.toUpperCase()}
              </h2>
              {/*Esta verificación debe cambiarse por el id del usuario con sesión iniciada*/}
              {user.username == userOnSession.username && (
                <Icons IconName={HiOutlinePencilAlt} />
              )}
            </div>
            <div className="flex gap-12">
              <p className="text-white text-l font-semibold">
                <strong>34</strong> Publicaciones
              </p>
              <p className="text-white text-l font-semibold">
                <strong>23</strong> Seguidores
              </p>
              <p className="text-white text-l font-semibold">
                <strong>43</strong> Seguidos
              </p>
              {/* Renderizar el botón de seguimiento solo si el usuario no es el mismo */}
              {user.username !== userOnSession.username && (
                <FollowButton user={user} userOnSession={userOnSession} />
              )}
            </div>

            <div className="flex flex-col gap-4 text-white text-l font-bold ">
              <p className="font-normal">
                {user.first_name + " " + user.last_name}
              </p>
              <p> {user.employed ? "Empleado" : "Desempleado"} </p>
            </div>
          </div>
        </Card>
      </div>

      // from-blue-600 to-emerald-600 bg-clip-text
    );
}

export default UserCard;