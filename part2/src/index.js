// Explicación: viedeo 5 - Fetching y mutación de datos
import ReactDOM from 'react-dom'
import './App.css'
import { useEffect, useState } from 'react'
import noteService from './services/notes'
import loginService from './services/login'

// components
import RenderLoginForm from './components/LoginForm'
import Notes from './components/Notes'
import RenderCreateNoteForm from './components/NoteForm'

function App () {
  const [notes, setNotes] = useState([])
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

  const addNote = newObject => {
    noteService.create(newObject)
      .then(newNote => setNotes(prevNotes => prevNotes.concat(newNote)))
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
              handleChangeCredentials={[handleChangeUsername, handleChangePassword]}
              value={[username, password]}
            />

          : <RenderCreateNoteForm
              addNote={addNote}
              handleLogout={handleLogout}
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
