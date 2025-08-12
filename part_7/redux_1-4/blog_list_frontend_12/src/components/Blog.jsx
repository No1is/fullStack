import { useSelector, useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";
import { toggleView } from "../reducers/viewReducer";
import { setNotification } from "../reducers/messageReducer";

const Blog = ({ blogId }) => {
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blogs.find((b) => b.id === blogId));
  const user = useSelector((state) => state.user.user);
  const showBlog = useSelector((state) => state.showBlog[blogId]);

  const like = (blog) => {
    const newLikes = blog.likes + 1;
    dispatch(likeBlog(blog, newLikes));
    dispatch(setNotification(`you liked ${blog.title}`));
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleShow = () => {
    dispatch(toggleView(blogId));
  };
  const showRemove =
    user && blog.user
      ? user.username === blog.user.username
        ? true
        : false
      : false;

  const deleteBlog = (blog) => {
    dispatch(removeBlog(blog));
    dispatch(setNotification(`'${blog.title}' removed`));
  };

  const showDetails = () => {
    if (showBlog) {
      return (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}
            <button onClick={() => like(blog)}>like</button>
          </p>
          <p>{blog.user.name}</p>
          {showRemove ? (
            <button onClick={() => deleteBlog(blog)}>remove</button>
          ) : null}
        </div>
      );
    }
  };

  return (
    <div style={blogStyle} className={"blog-container"}>
      {blog.title} {blog.author}
      <button onClick={toggleShow}>{showBlog ? "hide" : "view"}</button>
      {showDetails()}
    </div>
  );
};

export default Blog;
