import './App.css';
import { useState } from 'react';

// components
const Note = ({ content, date, categories = [] }) => {
  return (
    <li>
      <p>{content}</p>
      <small><time>{date}</time></small>
      {categories.map(category =>
        <ul key={category}> <li>{category}</li></ul>
      )}
    </li>
  )
}

export default function App(props) {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  const handleChange = (e) => {
    setNewNote(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNoteToAddToState = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }
    console.log(newNoteToAddToState)
    setNotes(notes.concat(newNoteToAddToState));
    setNewNote('');
  }

  const handleShowAll = () => {
    setShowAll(() => !showAll)
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={handleShowAll}>{showAll ? 'show only important' : 'show all'}</button>
      <ol>
        {notes
        .filter(note => showAll ? true : note.important === true)
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