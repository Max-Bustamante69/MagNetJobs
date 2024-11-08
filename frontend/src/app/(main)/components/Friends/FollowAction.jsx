import { sendFriendRequest } from "@/app/components/Notifications/FriendRequestNotification";

export async function FriendShipCreation(user, userOnSession)
{   

    console.log(
      JSON.stringify({
        user: userOnSession,
        friend: user,
      })
    );

    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/friendship/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userOnSession,
          friend: user,
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
