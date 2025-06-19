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

const Display = ({ countryList,filterBy,handleShow,selected,weather }) => {
  
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
        <ShowCountry country={countryList[0]} weather={weather} />
      </div>
    )
  } else {
    return(
      <div><p>Too many matches, specify another filter</p></div>
    )
  }
}

const ShowCountry = ({ country,weather }) => {
  if (country && weather) {
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
        <h2>Weather in {country.capital}</h2>
        <div>Temperature {weather.main.temp} Celsuis</div>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
        <div>Wind {weather.wind.speed} m/s</div>
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
  const [ weather,setWeather ] = useState(null)

  const trimFilter = filterBy.trim().toLowerCase()
  const countryList = countries.filter((country) => country.name.common.toLowerCase().includes(trimFilter))
  
  
  
  useEffect(() => {
    dataService
      .getAll()
      .then(initialData => setCountries(initialData))
  },[])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelected(null)
  }

  const handleShow = (country) => {
    if (selected === country){
      setSelected(null)
      setWeather(null)
    } else{
      setSelected(country)
    }
    
  }
  useEffect(() => {
    const country = selected || (countryList.length === 1? countryList[0] : null)

    if (country?.capital){
      dataService
        .weather(country.capital,country.cca2)
        .then(current => setWeather(current))
    }
  },[selected,filterBy])

  return(
    <div>
      <Form filterBy={filterBy} handleFilterChange={handleFilterChange} /> 
      <Display filterBy={filterBy} countryList={countryList} handleShow={handleShow} selected={selected} weather={weather} />
      <ShowCountry country={selected} weather={weather} />
    </div>
  )
  

}

export default App