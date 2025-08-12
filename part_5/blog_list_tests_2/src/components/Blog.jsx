import { useState } from 'react'

const Blog = ({ blog, addLikes, removeBlog }) => {
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
          <p className='url'>{blog.url}</p>
          <p className='likes'>
            likes {blog.likes}
            <button onClick={() => addLikes(blog)}>like</button>
          </p>
          <p>{blog.user.name}</p>
          <button onClick={() => removeBlog(blog)}>remove</button>
        </div>
      )
    }
  }

  return (
    <div style={blogStyle} className='defaultBlog'>
      {blog.title} {blog.author}
      <button onClick={toggleShow}>{showBlog? 'hide': 'view'}</button>
      {showDetails()}
    </div>
  )
}

export default Blog