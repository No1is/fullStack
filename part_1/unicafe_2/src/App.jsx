import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Display = ({ text, value }) => <p>{text} {value}</p>

const All = ({ total }) => <Display text='all' value={total} />

const Avg = ({ good, bad, total }) => {
  if (total == 0) {
    return <Display text='average' value={0} />
  }
  const avg = (good-bad)/total
  return (
    <Display text='average' value={avg} />
  )
}

const Positive = ({ good, total }) => {
  if (total == 0) {
    return <Display text='positive' value={0 + ' %'} />
  }
  return <Display text='positive' value={(good/total)*100 + ' %'} />
}

const App = () => {
  // save clicks of each button to its state
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleBad = () => setBad(bad + 1)
  const handleNeutral = () => setNeutral(neutral + 1)

  const total = () => good + bad+ neutral 

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <h2>statistics</h2>
      <Display text='good' value={good} />
      <Display text='neutral' value={neutral} />
      <Display text='bad' value={bad} />
      <All total={total()} />
      <Avg good={good} bad={bad} total={total()} />
      <Positive good={good} total={total()} />
    </div>
  )
}


export default App