import { useEffect, useState } from "react"
import noteService from '../services/notes'

export const useNotes = () => {
  const [notes, setNotes] = useState([]) // eslint-disable-line
  useEffect(() => {
    noteService.getAll().then(initialNotes => setNotes(initialNotes))
  }, [])

  const addNote = noteObject => {
    noteService
      .create(noteObject)
      .then(newNote => setNotes(prevNotes => prevNotes.concat(newNote)))
  }

  const toggleImportance = id => {

    const note = notes.find(n => n.id === id)
    const changedNote = {
      ...note,
      important: !note.important
    }

    return noteService
      .update(id, changedNote)
      .then(changedNote => 
        setNotes(notes.map(note => note.id === id ? changedNote : note))
      )
  }

  return {
    notes,
    addNote,
    toggleImportance
  }
}