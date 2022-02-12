// Explicación: viedeo 5 - Fetching y mutación de datos
import ReactDOM from 'react-dom'
import './App.css'
import { useEffect, useState } from 'react'
import noteService from './services/notes'
import loginService from './services/login'

// components
import RenderLoginForm from './components/LoginForm'
import Notes from './components/Notes'

const RenderCreateNoteForm = ({ handleSubmitNote, type, placeholder, handleLogout, handleChangeNote, value }) => {
  return (
    <>
      <form onSubmit={handleSubmitNote}>
        <input
          type={type}
          placeholder={placeholder}
          onChange={handleChangeNote}
          value={value}
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

function App () {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService.getAll().then(initialNotes => setNotes(initialNotes))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleChangeNote = e => setNewNote(e.target.value)

  const handleSubmitNote = e => {
    e.preventDefault()

    const newNoteToAddToState = {
      content: newNote,
      important: Math.random() < 0.5
    }

    const { token } = user

    noteService.create(newNoteToAddToState, { token })
      .then(newNote => setNotes(prevNotes => prevNotes.concat(newNote)))
    setNewNote('')
  }

  const toggleImportance = (id) => {
    console.log('ndeahh')
    // const note = notes.find(n => n.id === id)
    // const changedNote = { ...note, important: !note.important }

    // return () => {
    //   noteService.update(id, changedNote)
    //     .then(returnedNote => {
    //       setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    //     })
    // }
  }

  const handleShowNotes = () => setShowAll(prev => !prev)

  const notesToShow = showAll ? notes : notes.filter(n => n.important === true)

  const handleChangeUsername = ({ target }) => setUsername(target.value)
  const handleChangePassword = ({ target }) => setPassword(target.value)

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

      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))

      noteService.setToken(user.token)
    } catch (error) {
      console.error(error)
      setErrorMessage('invalid user or password')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    noteService.setToken(null)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  return (
    <div>
      <h1>Notes</h1>
      <p>{errorMessage}</p>

      {
        user === null
          ? <RenderLoginForm
              handleLogin={handleLogin}
              type={['text', 'password']}
              placeholder={['username', 'password']}
              handleChangeCredentials={[handleChangeUsername, handleChangePassword]}
              value={[username, password]}
            />

          : <RenderCreateNoteForm
              handleSubmitNote={handleSubmitNote}
              type='text'
              placeholder='write your new note'
              handleChangeNote={handleChangeNote}
              handleLogout={handleLogout}
              value={newNote}
            />
      }

      <button onClick={handleShowNotes}>{showAll ? 'show only important' : 'show all'}</button>
      <Notes notes={notesToShow} toggleImportance={toggleImportance} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
