import axios from 'axios'
const baseURL = 'http://localhost:3001/api/notes'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(baseURL, newObject, config)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const request = axios.put(`${baseURL}/${id}`, newObject, config)
  return request.then(response => response.data)
}

export default { setToken, getAll, create, update }
