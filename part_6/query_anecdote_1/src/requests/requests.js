import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}