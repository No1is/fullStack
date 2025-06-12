import { useState } from 'react'

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const Display = ({ anecdotes,anecdote,votes }) => {
  return(
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[anecdote]}</p>
      <p>has {votes[anecdote]} votes</p>
    </div>
  )
}

const Most = ({ mostVotes, anecdotes }) => {
  return(
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotes]}</p>
    </div>
  )
}

const App = () => {
  const [votes,setVote] =useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 })
  const [selected,setSelected] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const mostVotes = Number(Object.keys(votes).reduce((a,b) => votes[a] > votes[b]? a : b));

  
  const handleNext = () => {
    const randomInd = Math.floor(Math.random()*anecdotes.length)
    setSelected(randomInd)
  }

  const handleVote = () => setVote(oldVote => ({...oldVote, [selected]: oldVote[selected] + 1}))  

  return(
    <div>
      <Display anecdotes={anecdotes} anecdote={selected} votes={votes} />
      <div> 
        <Button onClick={handleVote} text='vote' />
        <Button onClick={handleNext} text='next anecdote' />
      </div>
      <Most mostVotes={mostVotes} anecdotes={anecdotes} />
    </div>
  )
}


export default App