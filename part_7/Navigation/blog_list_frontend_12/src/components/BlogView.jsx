import { useSelector, useDispatch } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/messageReducer'

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
                <button onClick={() => like(blog)}>like</button>
            </div>
            <div>added by {blog.user.name}</div>
        </div>
    )
}

export default BlogView