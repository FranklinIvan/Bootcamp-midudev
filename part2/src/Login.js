import { useEffect, useState } from "react"
import noteService from './services/notes'
import loginService from './services/login'
import RenderLoginForm from "./components/LoginForm"
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const [user, setUser] = useState(null) // eslint-disable-line
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      setUser(user)
      noteService.setToken(user.token)

      setUsername('')
      setPassword('')
      navigate('/notes')

    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  if (errorMessage) return <p>{errorMessage}</p>
  if (user) return <p>you are logged in</p>

  return(
    <RenderLoginForm 
      handleSubmit={handleLogin}
      username={username}
      password={password}
      handleUsernameChange={
        ({target}) => setUsername(target.value)
      }
      handlePasswordChange={
        ({ target }) => setPassword(target.value)
      }
    />
  )
}