import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from './components/Notify'

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setMessage] = useState(null)

  const notify = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Notify message={errorMessage} />

      <Authors show={page === "authors"} setMessage={notify} />

      <Books show={page === "books"} setMessage={notify} />

      <NewBook show={page === "add"} setMessage={notify} />
    </div>
  );
};

export default App;
