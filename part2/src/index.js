import ReactDOM from 'react-dom'
import './App.css';
import { useEffect, useState } from 'react';
import { getAllNotes } from './services/notes/getAllNotes';
import { createNote } from './services/notes/createNote';

// Explicación: viedeo 5 - Fetching y mutación de datos

// components
const Note = ({ title, body }) => {
  return (
    <li>
      <p>{title}</p>
      <small><time>{body}</time></small>
    </li>
  )
}

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    getAllNotes().then(notes => setNotes(notes))
  }, [])

  const handleChange = e => setNewNote(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    const newNoteToAddToState = {
      title: newNote,
      body: newNote,
      idUser: 1
    }
    createNote(newNoteToAddToState).then(newNote => {
      setNotes(prev => prev.concat(newNote))
    })

    setNewNote('');
  }

  return (
    <div>
      <h1>Notes</h1>
      <ol>
        {notes
          .map(note =>
            (<Note key={note.id} {...note} />)
          )}
      </ol>
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