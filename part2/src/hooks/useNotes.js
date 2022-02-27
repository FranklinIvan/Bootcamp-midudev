import { useEffect, useState } from "react"
import noteService from '../services/notes'

export const useNotes = () => {
  const [notes, setNotes] = useState([])
  
  useEffect(() => {
    noteService.getAll().then(initialNotes => setNotes(initialNotes))
  }, [])

  const addNote = noteObject => {
    noteService
      .create(noteObject)
      .then(newNote => setNotes(prevNotes => prevNotes.concat(newNote)))
  }

  const toggleImportance = async id => {
    const note = notes.find(n => n.id === id)
    const noteToChange = {
      ...note,
      important: !note.important
    }

    const changedNote = await noteService.update(id, noteToChange)
    return setNotes(notes.map(note => note.id === id ? changedNote : note))
  }

  return {
    notes,
    addNote,
    toggleImportance
  }
}