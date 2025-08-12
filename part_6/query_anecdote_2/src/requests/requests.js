import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}

export const create = (newAnecdote) => {
  return axios.post(baseUrl, newAnecdote).then(res => res.data)
}