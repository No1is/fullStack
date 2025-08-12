import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = async (blog,newLikes) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, { likes: newLikes })
  return response.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const remove = async blog => {
  const config = {
    headers: { Authorization: token }
  }

  await axios.delete(`${baseUrl}/${blog.id}`, config)
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export default { getAll, setToken, create, update, remove }