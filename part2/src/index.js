// Explicación: viedeo 5 - Fetching y mutación de datos
import ReactDOM from 'react-dom'
import './App.css';
import { useEffect, useState } from 'react';
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

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    noteService.getAll().then(initialNotes => setNotes(initialNotes))
  }, [])

  const handleChangeNote = e => setNewNote(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();

    const newNoteToAddToState = {
      // id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5
    }

    noteService.create(newNoteToAddToState)
      .then(newNote => setNotes(prevNotes => prevNotes.concat(newNote)))
    setNewNote('');
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    return () => {
      noteService.update(id, changedNote)
        .then(returnedNote => {
          setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        })
    }
  }

  const handleShow = () => setShowAll(prev => !prev)

  const notesToShow = showAll ? notes : notes.filter(n => n.important === true)

  const handleChangeUsername = ({target}) => setUsername(target.value)
  const handleChangePassword = ({target}) => setPassword(target.value)

  const handleLogin = e => {
    e.preventDefault()

    console.log(username)
    console.log(password)
    console.log('sending...')
  }

  return (
    <div>
      <h1>Notes</h1>

      <form onSubmit={handleLogin}>
        <input type='text' placeholder='username' onChange={handleChangeUsername} value={username}/>
        <input type='password' placeholder='password' onChange={handleChangePassword} value={password} />
        <button>Log in</button>
        <br />
        <br />
      </form>

      <button onClick={handleShow}>{showAll ? 'show only important' : 'show all'}</button>
      <Notes notesToShow={notesToShow} handleChange={toggleImportanceOf} />

      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChangeNote} value={newNote} />
        <button>Create note</button>
      </form>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)