

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

 function UserCard({ user }) {

    return (

        <div className='relative rounded-xl w-full group'>
          <Card className="relative bg-black border-gray-400 flex justify-around p-8 z-10 ">
            <div className='flex flex-col items-center justify-center'>
              <Avatar  className='size-40'>
                <AvatarImage   src="https://images.squarespace-cdn.com/content/v1/606d159a953867291018f801/1619987722169-VV6ZASHHZNRBJW9X0PLK/Key_Art_02_layeredjpg.jpg?format=1500w" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className='flex flex-col gap-y-4'>
                <div className='flex justify-around'>
                    <h2 className='text-white text-4xl font-bold'> 
                        
                        {user.username.toUpperCase()}
    
                    </h2>
    
    
                    <Button  variant="outline">Editar Perfil</Button>
    
    
                </div>
                <div className='flex gap-4'>
                    <p className="text-white"><strong>34</strong> Publicaciones</p>
                    <p className="text-white"><strong>23</strong> Seguidores</p>
                    <p className="text-white"><strong>43</strong> Seguidos</p>
                </div>
    
                <div className='flex flex-col gap-4 text-white'>
                    <p>{user.first_name + ' ' + user.last_name}</p>
                    <p> {user.employed ? 'Empleado' : 'Desempleado'} </p>
    
                </div>
            </div>
          </Card>
          <div className='absolute rounded-xl inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000 group-hover:duration-200'></div>
        </div>


        );
}

export default UserCard;