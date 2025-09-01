import { useState, useEffect } from 'react';
import type { DiaryEntry } from './types/types';
import { getAll } from './services/diaryService'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(()=> {
    getAll().then(data => {
      setDiaries(data)
    })
  }, [])

  return (
    <div>
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