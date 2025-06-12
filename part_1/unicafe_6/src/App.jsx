import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Display = ({ text, value }) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const StatisticLine = ({ text, value }) => {
  if (text === 'positive') return <Display text={text} value={value + ' %'} />
  
  return <Display text={text} value={value} />
}

const Statistics = ({ good,bad,neutral,total,avg,percent }) => {
  if (total === 0) {
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
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} /> 
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={total} />
          <StatisticLine text='average' value={avg} />
          <StatisticLine text='positive' value={percent} />
        </tbody>
      </table>
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

  const total = (good + bad+ neutral)
  const avg = ((good - bad)/ total)
  const percent = ((good/total)*100)
  

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <Statistics good={good} bad={bad} neutral={neutral} total={total} avg={avg} percent={percent} />
    </div>
  )
}


export default App