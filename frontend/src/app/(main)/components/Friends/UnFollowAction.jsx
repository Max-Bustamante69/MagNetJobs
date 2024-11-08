import {getFriendshipId} from './GetFrienshipId';

export async function deleteFriendship(user, friend) {
    const friendshipId= await getFriendshipId(user.id, friend.id);
    if (!friendshipId) {
        console.error("No se pudo obtener el ID de la amistad para eliminarla");
        return;
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/friendship/${friendshipId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            console.error("Error al eliminar la amistad. Status:", response.status);
            return;
        }
        alert("Amistad eliminada correctamente");
        console.log('Amistad eliminada correctamente');
        window.location.reload();
    } catch (error) {
        console.error('Error en la solicitud de eliminación de la amistad:', error);
    }
}