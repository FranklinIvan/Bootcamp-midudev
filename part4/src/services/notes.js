import axios from 'axios'

const baseUrl = 'http://localhost:3003/notes'

const getAllNotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOneNote = async id => {
  const notes = await getAllNotes()
  const note = notes.find(n => n.id === id)

  return note
}

const createNewNote = async content => {
  const newNote = {
    content,
    important: Math.random() > .5
  }

  const response = await axios.post(baseUrl, newNote)
  return response.data
}

const toggleImportanceOf = async id => {

  const note = await getOneNote(id)
  const newNote = {
    ...note,
    important: !note.important
  }

  const response = await axios.put(`${baseUrl}/${id}`, newNote)
  return response.data
}

export default { getAllNotes, createNewNote, toggleImportanceOf } // eslint-disable-line