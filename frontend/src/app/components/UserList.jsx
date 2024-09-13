import UserCard from './UserCard';



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



async function UserList() {

    const users = await loadUsers();
    
    return (
        <div >
            <h2>User List</h2>
            <table>
            <thead>
                <tr>
                    <th>
                        Id
                    </th>
                    <th>
                        User Name
                    </th>
                    <th>
                        Last Name
                    </th>
                </tr>
            </thead>
            <tbody>
            {
                users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))
            }
            </tbody>
        </table>
           
        </div>
    );
}

export default UserList;
        