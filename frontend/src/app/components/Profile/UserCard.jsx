
import LoadUser from "@/utils/LoadUser";
import Icons from "../General/Icons";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HiOutlinePencilAlt } from "react-icons/hi";
import FollowButton from "../Friends/FollowButton";


 async function UserCard({ user }) {
  const userOnSessionName = 'Maxbustamante';
  const userOnSession= await LoadUser(userOnSessionName);

    return (
      <div className="relative rounded-xl w-full group">
        <Card className="relative bg-black border-gray-400 flex justify-around p-8 z-10 ">
          <div className="flex flex-col items-center justify-center">
            <Avatar className="size-40">
              <AvatarImage src="https://images.squarespace-cdn.com/content/v1/606d159a953867291018f801/1619987722169-VV6ZASHHZNRBJW9X0PLK/Key_Art_02_layeredjpg.jpg?format=1500w" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex justify-around">
              <h2 className="text-white text-4xl font-bold">
                {user.username.toUpperCase()}
              </h2>
              {/*Esta verificación debe cambiarse por el id del usuario con sesión iniciada*/}
              {user.username== userOnSessionName &&(
              <Icons IconName={HiOutlinePencilAlt}/>)}
            </div>
            <div className="flex gap-4">
              <p className="text-white">
                <strong>34</strong> Publicaciones
              </p>
              <p className="text-white">
                <strong>23</strong> Seguidores
              </p>
              <p className="text-white">
                <strong>43</strong> Seguidos
              </p>
               {/* Renderizar el botón de seguimiento solo si el usuario no es el mismo */}
            {user.username !== userOnSessionName && (
              <FollowButton user={user} userOnSession={userOnSession}  />)}
            </div>

            <div className="flex flex-col gap-4 text-white">
              <p>{user.first_name + " " + user.last_name}</p>
              <p> {user.employed ? "Empleado" : "Desempleado"} </p>
            </div>
          </div>
        </Card>
        <div className="absolute rounded-xl inset-0 bg-gradient-to-r from-white  to-green-700 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000 group-hover:duration-200"></div>
      </div>

      // from-blue-600 to-emerald-600 bg-clip-text
    );
}

export default UserCard;