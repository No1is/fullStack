import { useState } from 'react'

const Blog = ({ blog, addLikes }) => {
  const [showBlog, setShowBlog] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const toggleShow = () => {
    setShowBlog(!showBlog)
  }

  const showDetails = () => {
    if (showBlog) {
      return (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}
            <button onClick={() => addLikes(blog)}>like</button>
          </p>
          <p>{blog.author}</p>
        </div>
      )
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggleShow}>{showBlog? 'hide': 'view'}</button>
      {showDetails()}
    </div>
  )
}

export default Blog