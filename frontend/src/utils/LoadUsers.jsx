 async function loadUsers() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-store',  // Ensure no caching
            },
            cache: 'no-store',  // Also prevent fetch from caching
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}

export { loadUsers };