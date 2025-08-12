import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { initializeBlogs } from '../reducers/blogReducer'
import { setComment, resetComment } from '../reducers/commentFormReducer'

const CommentForm = ({ blog }) => {
    const dispatch = useDispatch()
    const comment = useSelector(state => state.comment)

    const addComment = async (event) => {
        event.preventDefault()

        await blogService.commentBlog(blog, comment)
        dispatch(initializeBlogs())
        dispatch(resetComment())
    }

    return (
        <div>
            <form onSubmit={addComment}>
                <input 
                  type='text'
                  value={comment}
                  name='comment'
                  onChange={({ target }) => dispatch(setComment(target.value))}
                />
                <button type='submit'>add comment</button>
            </form>
        </div>
    )
}

export default CommentForm