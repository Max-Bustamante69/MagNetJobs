export async function getFriendshipId(userId, friendId) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/friendship/get_id/${userId}/${friendId}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error("Error al obtener el ID de la amistad. Status:", response.status);
            return null; // Retorna null en caso de error
        }

        const data = await response.json();
        return data.friendship_id; // Devuelve el ID de la amistad
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
