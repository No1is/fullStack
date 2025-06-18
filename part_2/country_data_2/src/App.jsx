import { useState,useEffect } from 'react'
import dataService from './services/dataService'

const Form = ({ filterBy,handleFilterChange }) => {
  return(
      <div>
          <form>
              find countries:<input value={filterBy} onChange={handleFilterChange} />
          </form>
      </div>
  )
}

const Display = ({ countries,filterBy,handleShow,selected }) => {
  const trimFilter = filterBy.trim().toLowerCase()
  const countryList = countries.filter((country) => country.name.common.toLowerCase().includes(trimFilter))

  if (filterBy === '') {
      return (
        <div><p>Please specify a filter</p></div>
      )
  } else if (countryList.length <= 10 && countryList.length !== 1) {
    return(
      countryList.map((country) => 
        <div key={country.name.common}>
          {country.name.common}
          <Button handleShow={handleShow} country={country} selected={selected} />
        </div>
      )
    )
  } else if (countryList.length === 1) {
    return(
      <div>
        <ShowCountry country={countryList[0]} />
      </div>
    )
  } else {
    return(
      <div><p>Too many matches, specify another filter</p></div>
    )
  }
}

const ShowCountry = ({ country }) => {
  if (country) {
    return(
      <div>
        <h1>{country.name.common}</h1>
        <div>Capital {country.capital}</div>
        <div>Area {country.area}</div>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => <li key={language}>{language}</li>)}
        </ul>
        <div>
          <img src={country.flags.png} alt={country.flags.alt} />
        </div>
      </div>
    )
  } else {
    return
  }
}

const Button = ({ handleShow,country,selected }) => <button onClick={() => handleShow(country,selected)}>{selected === country? 'hide':'show'}</button>

const App = () => {
  const [ filterBy,setFilter ] = useState('')
  const [ countries,setCountries ] = useState([])
  const [ selected,setSelected ] = useState(null)
  
  useEffect(() => {
    dataService
      .getAll()
      .then(initialData => setCountries(initialData))
  },[])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelected(null)
  }

  const handleShow = (country,selected) => {
    if (selected === country){
      setSelected(null)
    } else{
      setSelected(country)
    }
  }

  return(
    <div>
      <Form filterBy={filterBy} handleFilterChange={handleFilterChange} /> 
      <Display filterBy={filterBy} countries={countries} handleShow={handleShow} selected={selected} />
      <ShowCountry country={selected} />
    </div>
  )
  

}

export default App