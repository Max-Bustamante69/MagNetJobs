
import {
    Card,
    CardDescription,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import formatTimeAgo from "@/utils/formatTimeAgo";
import { deleteNotification } from "./DeleteNotifications";
import { HiOutlineX } from "react-icons/hi";
import { FriendShipCreation } from "@/app/(main)/components/Friends/FollowAction";

export default function renderNotification(notification){
    console.log(notification)
    switch (notification.type) {
        case 'solicitud-amistad':
            return (
               
                <div key={notification.id} className="notification solicitud content-center ">
                    <Card className="bg-black bg-blend-color border-gray-600 text-white mb-0 ">
                        <CardHeader>
                            <div className="flex flex-row justify-between">
                                <CardTitle className="text-2xl">Solicitud de amistad</CardTitle>
                                <HiOutlineX
                                    className="text-gray-600 hover:text-green-700 transition duration-300 ease-in-out cursor-pointer"
                                    size={35}
                                    onClick={() => deleteNotification(notification.id)} />

                            </div>
                        </CardHeader>
                        <CardContent>
                            <p>{notification.content}</p>
                        </CardContent>
                        <CardFooter>
                            <div className="flex justify-between items-center w-full">
                                <button  
                                onClick={async ()=> {
                                    await FriendShipCreation(notification.recipient, notification.issuer)
                                    deleteNotification(notification.id)
                                }} 
                                className="text-gray-600 hover:text-green-700 transition duration-300 ease-in-out cursor-pointer text-sm">aceptar</button>
                                <p className="text-sm text-gray-500">{formatTimeAgo(notification.created_at)} ago</p>
                            </div>
                        </CardFooter>

                    </Card>
                </div>
            );
        case 'confirmación-amistad':
            return (
                <div key={notification.id} className="notification confirmacion">
                    <Card className="bg-black bg-blend-color border-gray-600 text-white mb-0 ">
                        <CardHeader>
                        <div className="flex flex-row justify-between">
                                <CardTitle className="text-2xl">confirmacion de amistad</CardTitle>
                                <HiOutlineX
                                    className="text-gray-600 hover:text-green-700 transition duration-300 ease-in-out cursor-pointer"
                                    size={35}
                                    onClick={() => deleteNotification(notification.id)} />

                            </div>
                        </CardHeader>
                        <CardContent>
                            <p>{notification.content}</p>
                        </CardContent>
                        <CardFooter>
                            <p>{formatTimeAgo(notification.created_at)}</p>
                        </CardFooter>
                    </Card>
                </div>
            );
        default:
            return (
                <div key={notification.id} className="notification default">
                    <Card className="bg-black bg-blend-color border-gray-600 text-white mb-0 ">
                        <CardHeader>
                        <div className="flex flex-row justify-between">
                            <CardTitle className="text-2xl">{notification.type}</CardTitle>
                            <HiOutlineX
                                    className="text-gray-600 hover:text-green-700 transition duration-300 ease-in-out cursor-pointer"
                                    size={35}
                                    onClick={() => deleteNotification(notification.id)} />
                        </div>
                        </CardHeader>
                        <CardContent>
                            <p>{notification.content}</p>
                        </CardContent>
                        <CardFooter>
                            <p>{formatTimeAgo(notification.created_at)}</p>
                        </CardFooter>
                    </Card>
                </div>
            );
    }
};