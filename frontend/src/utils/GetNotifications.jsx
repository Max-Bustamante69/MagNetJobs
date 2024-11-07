export default async function getNotificationsByRecipient(recipientId) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications/by_recipient/?recipient_id=${recipientId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error al obtener las notificaciones: ${errorData.detail || response.statusText}`);
        }

        const notifications = await response.json();
        console.log('Notificaciones obtenidas:', notifications);
        return notifications;  // Devuelve las notificaciones obtenidas
    } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
        return null;  // O maneja el error según necesites
    }
}
