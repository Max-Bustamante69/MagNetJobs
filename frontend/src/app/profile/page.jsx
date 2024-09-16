import { loadUsers } from '../../utils/LoadUsers'
import UserCard from '../components/Profile/UserCard'

async function Profile() {
    const users = await loadUsers();
    const user = users[0];

    return (
        <>
            <h2>Profile</h2>
            <UserCard user={user} />
        </>
    );
}

export default Profile;

