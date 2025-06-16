import { useState,useEffect } from 'react'
import axios from 'axios'

const PersonList = ({ persons,filterBy }) => {
  const personObj = persons.filter(person => person.name.toLowerCase().includes(filterBy.toLowerCase()))

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

const Form = ({ onSubmit,name,number,nameChange,numberChange }) => {
  return(
    <div>
      <h1>add a new</h1>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={name} onChange={nameChange} />
        </div>
        <div>
          number: <input value={number} onChange={numberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

const Filter = ({ filterBy,changeFilter }) => {
  return (
    <div>
      <h1>Phonebook</h1>
      <div>filter shown with: <input value={filterBy} onChange={changeFilter} /></div>
    </div>
  )
}

const Numbers = ({ persons,filterBy }) => {
  return (
    <div>
      <h1>Numbers</h1>
      <PersonList persons={persons} filterBy={filterBy} />
    </div>
  )
}

const App = () => {
  const [ persons,setPersons ] = useState([])
  const [ newName,setNewName ] = useState('')
  const [ newNumber,setNewNumber ] = useState('')
  const [ filterBy,setFilter ] = useState('')
  const baseUrl = 'http://localhost:3001/persons'

  useEffect(() => {
    axios.get(baseUrl).then(response => {
      setPersons(response.data)
    })
  },[])
  

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
      axios.post(baseUrl,personObject).then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange= (event) => {
    setFilter(event.target.value)
  }

  return(
    <div>
      <Filter filterBy={filterBy} changeFilter={handleFilterChange} />
      <Form onSubmit={handleNewPerson} name={newName} number={newNumber} nameChange={handleNameChange} numberChange={handleNumberChange} />
      <Numbers persons={persons} filterBy={filterBy} />
    </div>
  )
}

export default App