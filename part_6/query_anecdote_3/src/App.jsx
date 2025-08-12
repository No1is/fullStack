import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, update } from './requests/requests'

const App = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll
  })

  const updateMutation = useMutation({
    mutationFn: update,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']).map(a => a.id !== anecdote.id ? a : anecdote)
      queryClient.setQueryData(['anecdotes'], anecdotes)
    }
  })

  const handleVote = (anecdote) => {
    const newVotes = anecdote.votes + 1
    const updatedAnecdote = { ...anecdote, votes: newVotes}
    updateMutation.mutate(updatedAnecdote)
  }

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
