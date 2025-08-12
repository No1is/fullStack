import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { displayMessage } from '../reducers/messageReducer' 
import anecdoteService from '../services/anecdotes'

const AnecodteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.create(content)

    dispatch(createAnecdote(newAnecdote))
    dispatch(displayMessage(`anecdote '${content}' created`))
    setTimeout(() => {
      dispatch(displayMessage(null))
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecodteForm