import { useEffect } from 'react'
import { useUserListValue, useUserListDispatch } from '../contexts/UserListContext'
import { Link } from 'react-router-dom'

const Users = () => {
    const userList = useUserListValue()
    const setUserList = useUserListDispatch()
    

    useEffect(() => {
        setUserList()
    }, [])

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th><strong>blogs created</strong></th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((user) => (
                        <tr key={user.id}>
                            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users