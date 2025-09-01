import { useState, useEffect } from 'react';
import type { DiaryEntry, Visibility, Weather } from './types/types';
import { getAll, createNew } from './services/diaryService'

const App = () => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState<Visibility | null>(null)
  const [weather, setWeather] = useState<Weather | null>(null)
  const [comment, setComment] = useState('')
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [message, setMessage] = useState('')

  const weathArray = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'] as const;
  const visArray = ['great', 'good', 'ok', 'poor'] as const;

  useEffect(()=> {
    getAll().then(data => {
      setDiaries(data)
    })
  }, [])

  const notify = (message: string) => {
    setMessage(message)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if(date === '') {
      notify('please select a date')
      return
    }
    if(!weather || !visibility) {
      notify('Please make a selection for visibility and weather')
      return;
    }
    const newEntry = {
      date: date,
      weather: weather,
      comment: comment,
      visibility: visibility,
    }

    createNew(newEntry, setMessage).then(data => {
      if (data) {
        setDiaries(diaries.concat(data))
      }
    })
    setComment('')
    setVisibility('great')
    setDate('')
    setWeather('sunny')
  }

  return (
    <div>
      <h2>Add new entry</h2>
      {message === '' ? null: (
        <div style={{ color: 'red' }}>
          {message}
        </div>
      )}
      <form onSubmit={addEntry}>
        <div>
          Date:
          <input
            type='date'
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          Visibility:
          {visArray.map(vis => (
            <label key={vis}>
              <input
                type='radio'
                name='visibility'
                value={vis}
                checked={visibility === vis}
                onChange={() => setVisibility(vis)}
              />
              {vis}
            </label>
          ))}
        </div>
        <div>
          Weather:
          {weathArray.map(w => (
            <label key={w}>
              <input
                type='radio'
                name='weather'
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
              {w}
            </label>
          ))}
        </div>
        <div>
          Comment:
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type='submit'>add</button>
      </form>
      <h2>Diary Entries</h2>
      {diaries.map(d => (
        <div key={d.id}>
          <h3>{d.date}</h3>
          <div>visibility: {d.visibility}</div>
          <div>weather: {d.weather}</div>
        </div>
      ))}
    </div>
  )
}

export default App