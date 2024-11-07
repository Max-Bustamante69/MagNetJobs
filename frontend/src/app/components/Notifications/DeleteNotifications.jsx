export async function deleteNotification(notificationId){
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications/${notificationId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('Notificación eliminada con éxito');
        // Aquí puedes actualizar el estado de la interfaz, como eliminarla de una lista
      } else {
        console.error('Error al eliminar la notificación', await response.text());
      }
    } catch (error) {
      console.error('Error en la solicitud DELETE', error);
    }
  };
  