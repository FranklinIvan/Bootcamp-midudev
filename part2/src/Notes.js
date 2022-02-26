import './App.css'
import { useState } from 'react'
import RenderCreateNoteForm from './components/NoteForm'
import Note from './components/Note'
import { useUser } from './hooks/useUser'
import { useNotes } from './hooks/useNotes'

export default function Notes () {
  const { user, logout } = useUser()
  const { notes, addNote, toggleImportance } = useNotes()
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const toggleImportanceOfNote = id => {
    toggleImportance(id) // comes from custom hook
      .catch(error => {
        console.log(error)
        setErrorMessage('Error with note...')
        
        setTimeout(() => {
          setErrorMessage(null)
        }, 6000)
      })
  }

  const handleShowNotes = () => setShowAll(prev => !prev)
  const notesToShow = showAll ? notes : notes.filter(n => n.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <p>{errorMessage}</p>

      {
        user === null
          ? <>you must log in to create notes <br /></>

          : <RenderCreateNoteForm
              addNote={addNote}
              handleLogout={logout}
            />
      }

      <button onClick={handleShowNotes}>
        {showAll ? 'show only important' : 'show all'}
      </button>

      <ol>
        {
          notesToShow
            .map(note =>
              <Note
                key={note.id}
                note={note}
                toggleImportance={() => toggleImportanceOfNote(note.id)}
              />
            )
        }
      </ol>

    </div>
  )
}