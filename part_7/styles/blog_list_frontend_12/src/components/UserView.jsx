import { useSelector } from 'react-redux'
import { useMatch, Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

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
                <ListGroup>
                    {user.blogs.map(blog => (
                        <ListGroup.Item action key={blog.id}>
                            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    )
}

export default UserView