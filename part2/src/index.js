// Explicación: viedeo 5 - Fetching y mutación de datos
import ReactDOM from 'react-dom'
import './App.css';
import { useEffect, useState } from 'react';
import noteService from './services/notes';
import loginService from './services/login';

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

const RenderLoginForm = ({handleLogin, type, placeholder, handleChangeCredentials, value }) => {
  return (
    <form onSubmit={handleLogin}>
      <input 
        type={type[0]}
        onChange={handleChangeCredentials[0]}
        value={value[0]}
        placeholder={placeholder[0]}
      />
      <input 
        type={type[1]}
        onChange={handleChangeCredentials[1]}
        value={value[1]}
        placeholder={placeholder[1]}
      />
      <button>log in</button>
      <br />
      <br />
    </form>
  )
}

const RenderCreateNoteForm = ({handleSubmitNote, type, placeholder, handleChangeNote, value }) => {
  return (
    <form onSubmit={handleSubmitNote}>
      <input 
        type={type}
        placeholder={placeholder}
        onChange={handleChangeNote}
        value={value}
      />
      <button>create note</button>
    </form>
  )
}

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService.getAll().then(initialNotes => setNotes(initialNotes))
  }, [])

  const handleChangeNote = e => setNewNote(e.target.value);

  const handleSubmitNote = e => {
    e.preventDefault();

    const newNoteToAddToState = {
      content: newNote,
      important: Math.random() < 0.5
    }

    const {token} = user

    noteService.create(newNoteToAddToState, {token})
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

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })
  
      setUser(user)
      setUsername('')
      setPassword('')

      console.log(user)

    } catch (error) {
      console.error(error)
      setErrorMessage('invalid user or password')
      setTimeout(()=> {
        setErrorMessage('')
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Notes</h1>
      <p>{errorMessage}</p>

      {
        user === null
         ? <RenderLoginForm
            handleLogin={handleLogin}
            type={['text','password']}
            placeholder={['username','password']}
            handleChangeCredentials={[handleChangeUsername, handleChangePassword]}
            value={[username, password]}
          />

        : <RenderCreateNoteForm
            handleSubmitNote={handleSubmitNote}
            type={'text'}
            placeholder={'write your new note'}
            handleChangeNote={handleChangeNote}
            value={newNote}
          />
      }

      <button onClick={handleShow}>{showAll ? 'show only important' : 'show all'}</button>
      <Notes notesToShow={notesToShow} handleChange={toggleImportanceOf} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)