import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { displayMessage } from '../reducers/messageReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const sortedAnecdotes = [ ...anecdotes ].sort((a,b) => b.votes - a.votes)
    if (filter === '') {
      return sortedAnecdotes
    }
    const filteredAnecdotes = sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    if (filteredAnecdotes.length === 0) {
      dispatch(displayMessage('No anecdote found'))
      setTimeout(() => {
        dispatch(displayMessage(null))
      }, 5000)
    }

    return filteredAnecdotes
  })

  const vote = (id) => {
    const votedAnecdote = anecdotes.find(a => a.id === id)
    const newVotes = votedAnecdote.votes + 1
    dispatch(voteAnecdote(votedAnecdote, newVotes))
    
    dispatch(displayMessage(`you voted '${votedAnecdote.content}'`))
    setTimeout(() => {
      dispatch(displayMessage(null))
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote => 
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div> 
      )}
    </div>
  )
}

export default AnecdoteList