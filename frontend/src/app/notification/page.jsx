'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import formatTimeAgo from "@/utils/formatTimeAgo";

import getNotificationsByRecipient from "@/utils/GetNotifications";
import { useState, useEffect } from 'react';

function notification(){
    const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotificationsByRecipient();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    
    fetchNotifications();
  }, []);

  const renderNotification = (notification) => {
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
                    <CardTitle className="text-2xl">Confimación de amistad</CardTitle>
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
                    <CardTitle className="text-2xl">{notificacion.type}</CardTitle>
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

  return (
    <div className="mx-auto flex items-center justify-center">
        <div className="notifications-container flex flex-col space-y-2 content-center my-10 w-1/3 h-auto ">
        {notifications.length > 0 ? (
            notifications.map(notification => renderNotification(notification))
        ) : (
            <center><p>No tienes notificaciones.</p></center>
        )}
        </div>
    </div>
  );
}

export default notification;