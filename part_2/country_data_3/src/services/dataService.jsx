import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const api_key = import.meta.env.VITE_SOME_KEY
const weatherUrl = (city,code) => `https://api.openweathermap.org/data/2.5/weather?q=${city},${code}&appid=${api_key}&units=metric`

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const weather = (city) => {
    const request = axios.get(weatherUrl(city,code))
    return request.then(response => response.data)
} 

export default { getAll,weather }