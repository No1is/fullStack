import { useState } from 'react'

const Display = ({ persons }) => persons.map((person) => <div key={person.name}><p>{person.name}</p></div>)

const App = () => {
  const [ persons,setPersons ] = useState([{ name: 'Arto Hellas' }])
  const [ newName,setNewName ] = useState('')

  const handleNewName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }
  const handleNameChange = (event) => setNewName(event.target.value)

  return(
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Display persons={persons} />
    </div>
  )
}

export default App