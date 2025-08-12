import {
  useShowblogValue,
  useShowblogDispatch,
} from "../contexts/ShowblogContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";
import blogService from "../services/blogs";
import { useUserValue } from "../contexts/UserContext";

const Blog = ({ blog }) => {
  const { setNotification } = useContext(NotificationContext);
  const dispatch = useShowblogDispatch();
  const user = useUserValue().user;
  const showBlogMap = useShowblogValue();
  const showBlog = showBlogMap[blog.id];
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ blog, newLikes }) => blogService.update(blog, newLikes),
    onSuccess: (blog) => {
      const id = blog.id;
      const blogs = queryClient
        .getQueryData(["blogs"])
        .map((b) => (b.id !== id ? b : blog));
      queryClient.setQueryData(["blogs"], blogs);
    },
  });

  const removeMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      const id = blog.id;
      const blogs = queryClient
        .getQueryData(["blogs"])
        .filter((b) => b.id !== id);
      queryClient.setQueryData(["blogs"], blogs);
    },
  });

  const like = (blog) => {
    const newLikes = blog.likes + 1;
    updateMutation.mutate({ blog, newLikes });
    setNotification(`you liked '${blog.title}'`);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleShow = () => {
    dispatch({ type: "TOGGLE", payload: blog.id });
  };

  const showRemove =
    user && blog.user
      ? user.username === blog.user.username
        ? true
        : false
      : false;

  const deleteBlog = () => {
    removeMutation.mutate(blog);
    setNotification(`'${blog.title}' removed`);
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
          {showRemove ? <button onClick={deleteBlog}>remove</button> : null}
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
