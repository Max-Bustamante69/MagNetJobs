export  default async function createNotification ({recipientId, issuerId, content, type, postId=null}){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            recipient: recipientId,  // ID del usuario que recibirá la notificación
            issuer: issuerId,        // ID del usuario que envía la notificación
            content: content,  // Contenido de la notificación
            post: postId,
            type:type
        })
        });


            console.log(response);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error al crear la notificación ${errorData.detail || response.statusText}`);
            }
        
            const data = await response.json();
            console.log('Notificación creada:', data);
            return data;  // Retorna los datos de la notificación creada
        } catch (error) {
            console.error('Error al crear la notificación:', error);
        }  
        
  };
  