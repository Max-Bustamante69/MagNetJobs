

function UserCard({ user }) {
    return (

                <tr>
                    <td>
                        {user.id}
                    </td>
                    <td>
                        {user.first_name}
                    </td>
                    <td>
                        {user.last_name}
                    </td>
                </tr>

        );
}

export default UserCard;