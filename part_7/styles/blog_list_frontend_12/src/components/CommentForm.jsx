import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { initializeBlogs } from '../reducers/blogReducer'
import { setComment, resetComment } from '../reducers/commentFormReducer'
import { Form, Button } from 'react-bootstrap'

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
            <Form onSubmit={addComment}>
                <Form.Control 
                  type='text'
                  value={comment}
                  name='comment'
                  onChange={({ target }) => dispatch(setComment(target.value))}
                />
                <Button variant='light' type='submit'>add comment</Button>
            </Form>
        </div>
    )
}

export default CommentForm