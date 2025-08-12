import { useDispatch, useSelector } from "react-redux"
import { setNotification } from '../reducers/messageReducer'
import { logout } from '../reducers/userReducer'
import { resetView } from '../reducers/toggleReducer'
import { clearForm } from '../reducers/blogFormReducer'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'

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
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">Blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">Users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user
                ? <em style={padding}>{user.name} logged in<Button variant='primary' onClick={handleLogOut}>logout</Button></em>
                : <Link style={padding} to="/login">login</Link>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Menu
