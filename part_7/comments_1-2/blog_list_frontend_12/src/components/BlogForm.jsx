import { useDispatch, useSelector } from "react-redux";
import { updateForm, clearForm } from "../reducers/blogFormReducer";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/messageReducer";
import { initializeUsers } from '../reducers/usersListReducer'

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
      <h1>creaet new</h1>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            data-testid="title"
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) =>
              dispatch(updateForm({ name: "title", value: target.value }))
            }
          />
        </div>
        <div>
          author
          <input
            data-testid="author"
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) =>
              dispatch(updateForm({ name: "author", value: target.value }))
            }
          />
        </div>
        <div>
          url
          <input
            data-testid="url"
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) =>
              dispatch(updateForm({ name: "url", value: target.value }))
            }
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
