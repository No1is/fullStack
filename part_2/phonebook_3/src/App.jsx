import { useState } from 'react'

const Display = ({ persons }) => persons.map((person) => <div key={person.name}><p>{person.name} {person.number}</p></div>)

const App = () => {
  const [ persons,setPersons ] = useState([{ name: 'Arto Hellas', number: '040-1234567' }])
  const [ newName,setNewName ] = useState('')
  const [ newNumber,setNewNumber ] = useState('')

  const handleNewPerson = (event) => {
    event.preventDefault()
    const trimmedName = newName.trim()
    const personObject = {
      name: trimmedName,
      number: newNumber
    }

    if (trimmedName === ''){
      return
    }

    const nameExists = persons.some(
      person => person.name.toLowerCase() === trimmedName.toLowerCase()
    )

    if (nameExists) {
      alert(`${trimmedName} is already added to the phonebook`);
    } else {
      setPersons(persons.concat(personObject));
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  return(
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
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