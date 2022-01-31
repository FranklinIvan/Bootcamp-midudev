// Explicación: viedeo 5 - Fetching y mutación de datos
import ReactDOM from 'react-dom'
import './App.css';
import { useEffect, useState } from 'react';
// import { getAllNotes } from './services/notes/getAllNotes';
// import { createNote } from './services/notes/createNote';
import noteService from './services/notes';

// components
const Note = ({ id, content, important, handleChange }) => {
  return (
    <li>
      <span>{content}</span>
      <button onClick={handleChange(id)}>{important ? 'make not important' : 'make important'}</button>
    </li>
  )
}

const Notes = ({ notesToShow, handleChange }) => {
  return (
    <ol>
      {notesToShow
        .map(note =>
          (<Note key={note.id} {...note} handleChange={handleChange} />)
        )}
    </ol>
  )
}

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService.getAll().then(initialNotes => setNotes(initialNotes))
  }, [])

  const handleChange = e => setNewNote(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();

    const newNoteToAddToState = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5
    }

    setNotes(notes.concat(newNoteToAddToState))
    // createNote(newNoteToAddToState).then(newNote => {
    //   setNotes(prev => prev.concat(newNote))
    // })

    setNewNote('');
  }

  const handleShow = () => setShowAll(prev => !prev)

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    return () => {
      console.log(note.important);
      console.log(changedNote.important);
      noteService.update(id, changedNote)
        .then(returnedNote => {
          console.log(returnedNote);
          // setNotes(notes.map(n => n.id !== id ? note : returnedNote))
        })
    }
  }

  const notesToShow = showAll ? notes : notes.filter(n => n.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={handleShow}>{showAll ? 'show only important' : 'show all'}</button>
      <Notes notesToShow={notesToShow} handleChange={toggleImportanceOf} />

      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} value={newNote}></input>
        <button>Create note</button>
      </form>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)