
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import formatTimeAgo from "@/utils/formatTimeAgo";

export default function renderNotification(notification){
    switch (notification.type) {
        case 'solicitud-amistad':
            return (
                <div key={notification.id} className="notification solicitud content-center ">
                    <Card className="bg-black bg-blend-color border-gray-600 text-white mb-0 ">
                        <CardHeader>
                            <CardTitle className="text-2xl">Solicitud de amistad</CardTitle>
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
        case 'confirmación-amistad':
            return (
                <div key={notification.id} className="notification confirmacion">
                    <Card className="bg-black bg-blend-color border-gray-600 text-white mb-0 ">
                        <CardHeader>
                            <CardTitle className="text-2xl">Confirmación de amistad</CardTitle>
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
                            <CardTitle className="text-2xl">{notification.type}</CardTitle>
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