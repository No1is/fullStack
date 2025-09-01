import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.clearStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
         ) : (
          <button onClick={() => setPage("login")}>Login</button>
         )}
        
      </div>

      <Notify message={errorMessage} />

      <Authors show={page === "authors"} setMessage={notify} />

      <Books show={page === "books"} setMessage={notify} />

      <NewBook show={page === "add"} setMessage={notify} />

      <LoginForm show={page === 'login'} setMessage={notify} setPage={setPage} setToken={setToken} />

      <Recommend show={page === 'recommend'} />
    </div>
  );
};

export default App;
