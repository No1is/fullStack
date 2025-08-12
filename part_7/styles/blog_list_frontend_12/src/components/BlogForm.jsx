import { useDispatch, useSelector } from "react-redux";
import { updateForm, clearForm } from "../reducers/blogFormReducer";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/messageReducer";
import { initializeUsers } from '../reducers/usersListReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const newBlog = useSelector((state) => state.newBlog);

  const addBlog = async (event) => {
    event.preventDefault();
    await dispatch(createBlog(newBlog, user));
    dispatch(initializeUsers())
    dispatch(clearForm());
    dispatch(setNotification(`blog ${newBlog.title} added`));
  };

  return (
    <div>
      <h2>Create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            data-testid="title"
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) =>
              dispatch(updateForm({ name: "title", value: target.value }))
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author:</Form.Label>
          <Form.Control
            data-testid="author"
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) =>
              dispatch(updateForm({ name: "author", value: target.value }))
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Url:</Form.Label>
          <Form.Control
            data-testid="url"
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) =>
              dispatch(updateForm({ name: "url", value: target.value }))
            }
          />
        </Form.Group>
        <Button variant='primary'type="submit">Create Blog</Button>
      </Form>
    </div>
  );
};

export default BlogForm;
