export async function FriendShipCreation(user, userOnSession)
{
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/friendship/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userOnSession.id,
          friend_id: user.id,
        }),
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.error || "Error creating friendship");
      }
      alert("¡Solicitud de amistad confirmada!");
      return await response.json();
}
export function FollowRequest(user, userOnSession) {
    
    {/*Cambiar la condición true por la lógica de confirmación de solicitud */}
    if (true) {
        try {
          FriendShipCreation(user, userOnSession);
          alert("¡Solicitud de amistad enviada con éxito!");
        } catch (error) {
          alert(error.message);
        }
      } 
}
