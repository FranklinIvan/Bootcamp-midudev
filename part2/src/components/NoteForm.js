import { useState } from "react"
import Toggleable from "./Toggleable"

export default function RenderCreateNoteForm ({ addNote, handleLogout, }) {
  const [newNote, setNewNote] = useState('')

  const handleChange = ({ target }) => setNewNote(target.value)
  const handleSubmit = e => {
    e.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }
    addNote(noteObject)
    setNewNote('')
  }

  return (
    <Toggleable labelButton='create a note'>
    <h4>Create a note</h4>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='write your new note'
          onChange={handleChange}
          value={newNote}
        />
        <button>create note</button>
      </form>
      <br />
      <div>
        <button onClick={handleLogout}>log out</button>
      </div>
    </Toggleable>

  )
}
