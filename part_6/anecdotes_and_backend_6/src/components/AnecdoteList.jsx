import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const sortedAnecdotes = [ ...anecdotes ].sort((a,b) => b.votes - a.votes)
    if (filter === '') {
      return sortedAnecdotes
    }
    const filteredAnecdotes = sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    if (filteredAnecdotes.length === 0) {
      dispatch(setNotification('no anecdote found', 5000))
    }

    return filteredAnecdotes
  })

  const vote = (id) => {
    const votedAnecdote = anecdotes.find(a => a.id === id)
    const newVotes = votedAnecdote.votes + 1
    dispatch(voteAnecdote(votedAnecdote, newVotes))

    dispatch(setNotification(`you voted '${votedAnecdote.content}'`, 5000))
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