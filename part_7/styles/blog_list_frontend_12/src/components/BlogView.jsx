import { useSelector, useDispatch } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/messageReducer'
import CommentForm from './CommentForm'
import { Button, ListGroup } from 'react-bootstrap'

const BlogView = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)
    const match = useMatch('/blogs/:id')

    const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

    const like = (blog) => {
        const newLikes = blog.likes + 1
        dispatch(likeBlog(blog, newLikes))
        dispatch(setNotification(`you liked '${blog.title}'`))
    }
    
    if (!blog) return null

    return (
        <div>
            <h2>{blog.title} {blog.author}</h2>
            <div>{blog.url}</div>
            <div>
                {blog.likes} likes
                <Button variant='outline-dark' size='sm' onClick={() => like(blog)}>like</Button>
            </div>
            <div>added by {blog.user.name}</div>
            <h3>comments</h3>
            <CommentForm blog={blog}/>
            <ListGroup>
                {blog.comments.map((comment, index) => (
                    <ListGroup.Item key={index}>{comment}</ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default BlogView