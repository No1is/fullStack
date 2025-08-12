import { useState } from 'react'

const Blog = ({ blog, addLikes, removeBlog, user }) => {
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
  
  const showRemove = user.username === blog.user.username ? true : false

  const showDetails = () => {
    if (showBlog) {
      return (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}
            <button onClick={() => addLikes(blog)}>like</button>
          </p>
          <p>{blog.user.name}</p>
          { showRemove?
            <button onClick={() => removeBlog(blog)}>remove</button>
            : null
          }
        </div>
      )
    }
  }

  return (
    <div style={blogStyle} className={'blog-container'}>
      {blog.title} {blog.author}
      <button onClick={toggleShow}>{showBlog? 'hide': 'view'}</button>
      {showDetails()}
    </div>
  )
}

export default Blog