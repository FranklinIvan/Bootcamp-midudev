import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'

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

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(json => {
      const { data } = json
      setNotes(data)
    })
  }, [])

  const handleChange = (e) => {
    setNewNote(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNoteToAddToState = {
      id: notes.length + 1,
      title: newNote,
      body: newNote,
    }

    setNotes(notes.concat(newNoteToAddToState));
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