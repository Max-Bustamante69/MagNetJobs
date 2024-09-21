// pages/posts.jsx
import formatDate from '../../../utils/FormatDate'
import { loadUsers } from '../../../utils/LoadUsers'

async function loadPosts()
{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/`, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-store',  // Ensure no caching
            },
            cache: 'no-store',  // Also prevent fetch from caching
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}

async function ListPosts() {
    const posts= await loadPosts();
    const users = await loadUsers();

    // Función para obtener el nombre del usuario basado en el user_id
    const getUserById = (userId) => {
        const user = users.find((user) => user.id === userId);
        return user ? user.username : "Unknown User";
    };
    
    posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
  return (
    <div className="flex flex-col items-center">
        {posts.map(post =>(
            <div key={post.id} className="bg-neutral-900 px-4 py-3 mb-2 rounded-md w-1/2  flex flex-col justify-around space-y-3">
                <h1 className='text-lg font-semibold italic'>{getUserById(post.user)}</h1>
                
                <div className='flex justify-center'>
                    {post.image ? (
                            <img
                                src={`${post.image}`}
                                alt="Post image"
                                className="w-1/2 h-auto mb-2"
                                onError={(e) => console.log("Error loading image", e.target.src)}
                            />
                        ) : (
                            <p></p>
                        )}
                </div>
                <h2>{post.content}</h2>
                <p className='font-extralight text-xs'>{formatDate(post.created_at)}</p>
            </div>
        ))}

    </div>
  );
}

export default ListPosts;
