import { useSelector } from 'react-redux'
import { useMatch, Link } from 'react-router-dom'

const UserView = () => {
    const userList = useSelector((state) => state.userList)
    const match = useMatch('/users/:id')

    const user = match ? userList.find(user => user.id === match.params.id) : null

    if (!user) return null

    return (
        <div>
            <h1>{user.name}</h1>
            <h3>added blogs</h3>
            {user.blogs?.length > 0 && (
                <ul>
                    {user.blogs.map(blog => (
                    <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default UserView