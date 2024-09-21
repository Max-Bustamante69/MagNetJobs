// pages/posts.jsx
import React, { useState, useEffect, useRef } from 'react';
import formatDate from '../../../utils/FormatDate'
import { loadUsers } from '../../../utils/LoadUsers'

async function loadPosts(page = 1)
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

function ListPosts() {
    const [posts, setPosts] = useState([]); // Estado para las publicaciones
    const [users, setUsers] = useState([]); // Estado para los usuarios
    const [page, setPage] = useState(1); // Estado para la página actual
    const [loading, setLoading] = useState(false); // Estado de carga
    const loader = useRef(null); // Referencia para el observador
  
    // Función para obtener el nombre del usuario basado en el user_id
    const getUserById = (userId) => {
      const user = users.find((user) => user.id === userId);
      return user ? user.username : 'Unknown User';
    };
  
    // Función para cargar más publicaciones
    const fetchMorePosts = async () => {
      setLoading(true);
      const newPosts = await loadPosts(page);
      setPosts((prevPosts) => [...prevPosts, ...newPosts]); // Añadir las nuevas publicaciones al estado actual
      setPage((prevPage) => prevPage + 1); // Incrementar la página
      setLoading(false);
    };
  
    // useEffect para cargar usuarios y la primera tanda de posts al montar el componente
    useEffect(() => {
      const initializeData = async () => {
        const initialUsers = await loadUsers();
        setUsers(initialUsers);
        await fetchMorePosts(); // Cargar la primera página de posts
      };
      initializeData();
    }, []);
  
    // useEffect para configurar el IntersectionObserver
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          // Si el loader (referencia) es visible y no estamos cargando más publicaciones, carga más
          if (entries[0].isIntersecting && !loading) {
            fetchMorePosts();
          }
        },
        { threshold: 1.0 }
      );
  
      if (loader.current) {
        observer.observe(loader.current);
      }
  
      return () => {
        if (loader.current) {
          observer.unobserve(loader.current);
        }
      };
    }, [loading]);
  
    return (
      <div className="flex flex-col items-center">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-neutral-900 px-4 py-3 mb-2 rounded-md w-1/2 flex flex-col justify-around space-y-3"
          >
            <h1 className="text-lg font-semibold italic hover:underline">
              {getUserById(post.user)}
            </h1>
            <div className="flex justify-center">
              {post.image ? (
                <img
                  src={post.image}
                  alt="Post image"
                  className="w-1/2 h-auto mb-2"
                  onError={(e) => console.log('Error loading image', e.target.src)}
                />
              ) : (
                <p></p>
              )}
            </div>
            <h2>{post.content}</h2>
            <p className="font-extralight text-xs">{formatDate(post.created_at)}</p>
          </div>
        ))}
        {/* Referencia para el observador, se activará al llegar al final */}
        <div ref={loader} className="loader">
          {loading && <p>Loading more posts...</p>}
        </div>
      </div>
    );
  }
  
  export default ListPosts;