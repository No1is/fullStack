import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useContext } from "react";
import { useUserValue } from "../contexts/UserContext";
import blogService from "../services/blogs";
import NotificationContext from "../contexts/NotificationContext";

const initialState = {
  title: "",
  author: "",
  url: "",
};

const BlogForm = () => {
  const [newBlog, setNewBlog] = useState(initialState);
  const { setNotification } = useContext(NotificationContext);
  const user = useUserValue().user;
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (blog) => {
      const blogUser = {
        ...blog,
        user: {
          username: user.username,
          name: user.name,
          id: user.id,
        },
      };
      const blogs = queryClient.getQueryData(["blogs"]).concat(blogUser);
      queryClient.setQueryData(["blogs"], blogs);
    },
  });

  const addBlog = (event) => {
    event.preventDefault();
    createMutation.mutate(newBlog);
    setNotification(`blog ${newBlog.title} added`);
    setNewBlog(initialState);
  };

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            data-testid="title"
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
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
              setNewBlog({ ...newBlog, author: target.value })
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
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
