'use client';
import renderNotification from "../../components/Notifications/notification";
import getNotificationsByRecipient from "@/utils/GetNotifications";
import { useState, useEffect } from 'react';
import Loader from "@/components/ui/loader";

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true); 
  
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const data = await getNotificationsByRecipient();
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false); 
            }
        };
    
        fetchNotifications();
    }, []); 

    return (
        <div className="mx-auto flex items-center justify-center">
            <div className="notifications-container flex flex-col space-y-2 content-center my-10 w-1/3 h-auto ">
                {loading ? (
                    <div className="mx-auto flex items-center justify-center"><Loader /> </div>
                ) : notifications.length > 0 ? (
                    notifications.map(notification => renderNotification(notification))
                ) : (
                    <center><p>No tienes notificaciones.</p></center>
                )}
            </div>
        </div>
    );
}

export default Notification;
