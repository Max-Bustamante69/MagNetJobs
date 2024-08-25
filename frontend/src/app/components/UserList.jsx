import UserCard from './UserCard';



async function loadUsers() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`);
    const users = await response.json();
    console.log(users);
    return users;
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
        