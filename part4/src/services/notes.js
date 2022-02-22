import axios from 'axios'

const baseUrl = 'http://localhost:3003/notes'

const getAllNotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAllNotes }