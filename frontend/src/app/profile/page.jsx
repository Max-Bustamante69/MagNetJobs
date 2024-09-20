import { loadUsers } from '../../utils/LoadUsers'
import UserCard from '../components/Profile/UserCard'

async function Profile() {
    const users = await loadUsers()
    const user = users[0]

    return (
        <div className='flex flex-col items-center'>
            <section className='w-1/2 mt-12 flex flex-col items-center gap-12'>
            <h2  className='font-extrabold text-7xl'>Your <span className='bg-gradient-to-r text-transparent from-blue-600 to-emerald-600 bg-clip-text'>Profile</span></h2>
    
            <UserCard user={user} />
            </section>
        </div>
    );
}

export default Profile;

