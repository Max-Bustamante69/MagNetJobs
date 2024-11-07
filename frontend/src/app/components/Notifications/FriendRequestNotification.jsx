import { getUserContext } from "@/utils/GetUserContext";
import createNotification from "@/utils/CreateNotification"

export async function sendFriendRequest(user)
{
    const userOnSession = await getUserContext();  

    if (!userOnSession) {
        throw new Error('No se encontró el usuario en sesión');
    }
    const recipientId = user.id;  // ID del usuario que recibirá la notificación
    const issuerId = userOnSession.id;     // ID del usuario que envía la notificación
    const content = 'Tienes una nueva solicitud de amistad de '+ String(user.username);

  // Llamada a createNotification con los parámetros necesarios
    await createNotification({recipientId, issuerId, content});
}