import { useState,useEffect } from 'react'
import dataService from './services/dataService'

const Form = ({ filterBy,countries,handleFilterChange }) => {
  const trimFilter = filterBy.trim().toLowerCase()
  const countryList = countries.filter((country) => country.name.common.toLowerCase().includes(trimFilter))
  return(
      <div>
          <form>
              find countries:<input value={filterBy} onChange={handleFilterChange} />
          </form>
          <Display countries={countryList} filterBy={filterBy} />
      </div>
  )
}

const Display = ({ countries,filterBy }) => {

  if (countries.length <= 10 && countries.length !== 1) {
    return(
      countries.map((country) => 
        <div key={country.name.common}>{country.name.common}</div>
      )
    )
  } else if (countries.length === 1) {
    return(
      <div>
        <h1>{countries[0].name.common}</h1>
        <div>Capital {countries[0].capital}</div>
        <div>Area {countries[0].area}</div>
        <h2>Languages</h2>
        <ul>
          {Object.values(countries[0].languages).map((language) => 
            <li key={language}>{language}</li>
          )}
        </ul>
        <div><img src={countries[0].flags.png} alt={countries[0].flags.alt} /></div>
      </div>
    )
  } else {
    if (filterBy === '' || countries.length === 0 ) {
      return (
        <div><p>Please specify a filter</p></div>
      )
    } else {
      return(
        <div><p>Too many matches, specify another filter</p></div>
      )
    }
  }
}

const App = () => {
  const [ filterBy,setFilter ] = useState('')
  const [ countries,setCountries ] = useState([])
  
  useEffect(() => {
    dataService
      .getAll()
      .then(initialData => setCountries(initialData))
  },[])

  const handleFilterChange = (event) => setFilter(event.target.value)

  return(
    <div>
      <Form filterBy={filterBy} countries={countries} handleFilterChange={handleFilterChange} /> 
    </div>
  )
  

}

export default App