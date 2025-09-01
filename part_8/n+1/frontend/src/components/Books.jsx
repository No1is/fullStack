import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = ({ show, setMessage }) => {
  const [author, setAuthor] = useState('')
  const [genre, setGenre] = useState('')
  const variables = {
    author: author.trim() || undefined,
    genre: genre.trim() || undefined,
  }
  const result = useQuery(ALL_BOOKS, { 
    variables,
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      setMessage(messages)
    }
  }) 
  if (!show) {
    return null
  }


  const books = result.data?.allBooks ?? []

  

  return (
    <div>
      <h2>books</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          search by author:
          <input 
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
      </form>
      {genre === ''? (<div>in <strong>all genres</strong></div>) : (<div>in genre <strong>{genre}</strong></div>)}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setGenre('refactoring')}>refactoring</button>
        <button onClick={() => setGenre('agile')}>agile</button>
        <button onClick={() => setGenre('patterns')}>patterns</button>
        <button onClick={() => setGenre('design')}>design</button>
        <button onClick={() => setGenre('crime')}>crime</button>
        <button onClick={() => setGenre('classic')}>classic</button>
        <button onClick={() => setGenre('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
