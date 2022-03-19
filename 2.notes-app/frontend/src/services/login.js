import axios from 'axios'
const baseURL = 'http://localhost:3001/api/login'

const login = async credentials => {
  const { data } = await axios.post(baseURL, credentials)
  return data
}

export default { login } // eslint-disable-line
