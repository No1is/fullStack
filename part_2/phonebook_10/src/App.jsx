import { useState,useEffect } from 'react'
import numberService from './services/numbers'

const PersonList = ({ persons,filterBy,handleDelete }) => {
  const personObj = persons.filter(person => person.name.toLowerCase().includes(filterBy.toLowerCase()))

  if (filterBy === ''){
    return(
      persons.map((person) => <div key={person.name}>{person.name} {person.number}<Button onClick={() => handleDelete(person.id)} /></div>)
    )
  } else {
    return(
      personObj.map((person) => <div key={person.name}>{person.name} {person.number}<Button onClick={() => handleDelete(person.id)} /></div>)
    )
  }

}

const Button = ({ onClick }) => {
  return(
    <button onClick={onClick}>delete</button>
  )
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

const Numbers = ({ persons,filterBy,handleDelete }) => {
  return (
    <div>
      <h1>Numbers</h1>
      <PersonList persons={persons} filterBy={filterBy} handleDelete={handleDelete} />
    </div>
  )
}

const App = () => {
  const [ persons,setPersons ] = useState([])
  const [ newName,setNewName ] = useState('')
  const [ newNumber,setNewNumber ] = useState('')
  const [ filterBy,setFilter ] = useState('')

  useEffect(() => {
    numberService.getAll().then(initialPersons => {
      setPersons(initialPersons)
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

    const personExists = persons.find(person => person.name.toLowerCase() === trimmedName.toLowerCase())
    const updateNumber = personExists && personExists.number !== newNumber


    if (personExists) {
      if (updateNumber) {
        const changePerson = { ...personExists, number: newNumber }
        const confirm = window.confirm(`${trimmedName} is already added to phonebook, replace old number with a new one?`)
        
        if (confirm) {
          numberService.update(changePerson.id, changePerson).then(returnedPerson => {
            setPersons(persons.map(person => person.id === changePerson.id? returnedPerson: person))
            setNewNumber('')
            setNewName('')
          })
        } else {
          return
        }
      } else {
        alert(`${trimmedName} is already added to the phonebook`);
        setNewNumber('')
        setNewName('')
      }
    } else {
      numberService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
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

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    const confirm = window.confirm(`Delete ${person.name}?`)
    const newNumbers = persons.filter(p => p.id !== id )

    if (confirm) {
      numberService.remove(id).then(() => {
        setPersons(newNumbers)
      })
    } else {
      return
    }
  }

  return(
    <div>
      <Filter filterBy={filterBy} changeFilter={handleFilterChange} />
      <Form onSubmit={handleNewPerson} name={newName} number={newNumber} nameChange={handleNameChange} numberChange={handleNumberChange} />
      <Numbers persons={persons} filterBy={filterBy} handleDelete={handleDelete} />
    </div>
  )
}

export default App