import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Display = ({ text, value }) => <p>{text} {value}</p>

const All = ({ total }) => <Display text='all' value={total} />

const Avg = ({ good, bad, total }) => {
  if (total === 0) {
    return <Display text='average' value={0} />
  }
  const avg = (good-bad)/total
  return (
    <Display text='average' value={avg} />
  )
}

const Positive = ({ good, total }) => {
  if (total === 0) {
    return <Display text='positive' value={0 + ' %'} />
  }
  return <Display text='positive' value={(good/total)*100 + ' %'} />
}

const Statistics = ({ good,bad,neutral,total }) => {
  const totalValue = total()
  if (totalValue === 0) {
    return(
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
      <h2>statistics</h2>
      <Display text='good' value={good} />
      <Display text='neutral' value={neutral} />
      <Display text='bad' value={bad} />
      <All total={totalValue} />
      <Avg good={good} bad={bad} total={totalValue} />
      <Positive good={good} total={totalValue} />
    </div>
  )
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
      <Statistics good={good} bad={bad} neutral={neutral} total={total} />
    </div>
  )
}


export default App