import { useState } from 'react'

const Display = ({ persons,filterBy }) =>{
  const personObj = persons.filter(person => person.name.toLowerCase().includes(filterBy))

  if (filterBy === ''){
    return(
      persons.map((person) => <div key={person.name}><p>{person.name} {person.number}</p></div>)
    )
  } else {
    return(
      personObj.map((person) => <div key={person.name}><p>{person.name} {person.number}</p></div>)
    )
  }
} 

const App = () => {
  const [ persons,setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  
  const [ newName,setNewName ] = useState('')
  const [ newNumber,setNewNumber ] = useState('')
  const [ filterBy,setFilter ] = useState('')

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

  const handleFilterChange= (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  return(
    <div>
      <div>
        <h1>Phonebook</h1>
        <div>
          filter shown with: <input value={filterBy} onChange={handleFilterChange} />
        </div>
      </div>
      <div>
        <h1>add a new</h1>
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
        <h1>Numbers</h1>
        <Display persons={persons} filterBy={filterBy} />
      </div>
    </div>
  )
}

export default App