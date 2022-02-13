import { useState } from "react"

export default function RenderCreateNoteForm ({ addNote, handleLogout, }) {
  const [newNote, setNewNote] = useState('')

  const handleChange = ({ target }) => setNewNote(target.value)
  const handleSubmit = e => {
    e.preventDefault()

    const newObject = {
      content: newNote,
      important: Math.random() < 0.5
    }
    addNote(newObject)
    setNewNote('')
  }

  return (
    <>
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
    </>

  )
}
