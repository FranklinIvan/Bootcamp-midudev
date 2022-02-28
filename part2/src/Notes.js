import './App.css'
import { useState } from 'react'
import { useUser } from './hooks/useUser'
import { useNotes } from './hooks/useNotes'
import RenderCreateNoteForm from './components/NoteForm'
import Note from './components/Note'
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap'

export default function Notes () {
  const { user, logout } = useUser()
  const { notes, addNote, toggleImportance } = useNotes()
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const toggleImportanceOfNote = id => {
    toggleImportance(id) // comes from custom hook
      .catch(error => {
        console.log(error)
        setErrorMessage('An error has ocurred with note')
        
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
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

          : <>
              <RenderCreateNoteForm
                addNote={addNote}
              />
              <div>
                <Button variant='danger' onClick={logout}>log out</Button>
              </div>
            </>
      }

      <Button variant='info' onClick={handleShowNotes}>
        {showAll ? 'show only important' : 'show all'}
      </Button>

      <Table striped>
        <tbody>
          {
            notesToShow
              .map(note =>
                <tr key={note.id}>
                  <Note
                    key={note.id}
                    note={note}
                    toggleImportance={() => toggleImportanceOfNote(note.id)}
                  />
                </tr>
              )
          }
        </tbody>
      </Table>

    </div>
  )
}
