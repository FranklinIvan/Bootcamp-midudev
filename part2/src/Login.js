import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useUser } from "./hooks/useUser"
import RenderLoginForm from "./components/LoginForm"

export default function Login() {
  const navigate = useNavigate()
  const { user, login } = useUser()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async e => {
    e.preventDefault()

    try {
      login({username, password})
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