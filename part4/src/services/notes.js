import axios from 'axios'

const baseUrl = 'http://localhost:3003/notes'

const getAllNotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// const generateId = () => Math.floor(Math.random() * 999999) + 1

const createNewNote = async content => {
  const newNote = {
    content,
    important: Math.random() > .5
  }

  const response = await axios.post(baseUrl, newNote)
  return response.data
}

export default { getAllNotes, createNewNote } // eslint-disable-line