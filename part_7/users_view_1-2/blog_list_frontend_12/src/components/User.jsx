import { useUserListValue, useUserListDispatch } from "../contexts/UserListContext"
import { useEffect } from 'react'

const User = ({ userId }) => {
    const userList = useUserListValue()
    const setUserList = useUserListDispatch()
    const user = userList.find(user => user.id === userId)

    useEffect(() => {
        setUserList()
    }, [])

    if (!user) return <div>Loading user...</div>
    
    return (
        <div>
            <h1>{user.name}</h1>
            <div>
                <h3>added blogs</h3>
                <ul>
                    {user.blogs.map((blog) => (
                        <li key={blog.id}>
                            {blog.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default User