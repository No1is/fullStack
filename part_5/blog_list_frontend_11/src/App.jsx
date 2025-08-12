import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sorted = blogs.sort((a,b) => b.likes - a.likes)
      setBlogs(sorted)
    })  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedInUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const removeBlog = async blog => {
    const confirm = window.confirm(`remove blog ${blog.title} by ${blog.author}`)

    if (!confirm) {
      return
    }
    try{
      await blogService.remove(blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } catch (exception) {
      setErrorMessage('Failed to remove', exception.response?.data || error.message)
    }
  }

  const addLikes = async (blog) => {
    const newLikes = blog.likes + 1
    
    const updatedBlog = await blogService.update(blog, newLikes)
    setBlogs(blogs
      .map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
      .sort((a,b) => b.likes - a.likes)
    )
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const created = await blogService.create(blogObject)
      setBlogs(blogs.concat(created))

      setMessage(`a new blog ${blogObject.title} ${blogObject.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch(exception) {
      setErrorMessage('missing blog details')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    setUser(null)
    setMessage('you have been logged out')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const loginForm = () => {
    return (
      <div>
        <h1>log in to application</h1>
        <Notification error={errorMessage} message={message} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  } 

  return (
    <div>
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <Notification error={errorMessage} message={message} />
          <div>
            {user.name} logged in
            <button type="button" onClick={handleLogOut}>logout</button>
            <div>
              <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
              </Togglable>
            </div>
          </div>
          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} addLikes={addLikes} removeBlog={removeBlog} />
          )}
        </div>
      }
    </div>
  )
}

export default App