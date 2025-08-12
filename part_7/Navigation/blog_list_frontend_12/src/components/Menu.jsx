import { useDispatch, useSelector } from "react-redux"
import { setNotification } from '../reducers/messageReducer'
import { logout } from '../reducers/userReducer'
import { resetView } from '../reducers/toggleReducer'
import { clearForm } from '../reducers/blogFormReducer'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)

  const padding = {
    paddingRight: 5
  }
  const divStyle = {
    backgroundColor: 'lightgrey'
  }

  const handleLogOut = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    dispatch(logout())
    dispatch(resetView())
    dispatch(clearForm())
    dispatch(setNotification('you have been logged out'))
  }

  if(!user) return null

  return (
    <div style={divStyle}>
      <Link to='/' style={padding}>blogs</Link>
      <Link to='/users' style={padding}>users</Link>
      {user.name} logged in
      <button onClick={handleLogOut}>logout</button>
    </div>
  )
}

export default Menu