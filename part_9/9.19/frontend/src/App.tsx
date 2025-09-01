import { useState, useEffect } from 'react';
import type { DiaryEntry } from './types/types';
import { getAll, createNew } from './services/diaryService'

const App = () => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [message, setMessage] = useState('')

  useEffect(()=> {
    getAll().then(data => {
      setDiaries(data)
    })
  }, [])

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault()
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
    setVisibility('')
    setDate('')
    setWeather('')
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
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          Visibility:
          <input
            value={visibility}
            onChange={({ target }) => setVisibility(target.value)}
          />
        </div>
        <div>
          Weather:
          <input
            value={weather}
            onChange={({ target }) => setWeather(target.value)}
          />
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