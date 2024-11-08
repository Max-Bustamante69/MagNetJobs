import { sendFriendRequest } from "../Notifications/FriendRequestNotification";

export async function FriendShipCreation(user, userOnSession)
{
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/friendship/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userOnSession,
          friend_id: user,
        }),
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.error || "Error creating friendship");
      }
      alert("¡Solicitud de amistad confirmada!");
      const data = await response.json();
      console.log('amistad creada:', data);
      return data;
}
export function FollowRequest(user) {
        try {
          sendFriendRequest(user);
          alert("¡Solicitud de amistad enviada con éxito!");
        } catch (error) {
          alert(error.message);
        }
      
}
