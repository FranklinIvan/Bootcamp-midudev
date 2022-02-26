import { useEffect, useState } from "react"
import noteService from './services/notes'
import loginService from './services/login'
import RenderLoginForm from "./components/LoginForm"

export default function Login() {
  const [user, setUser] = useState(null)

  console.log(user)
  
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async credentials => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)

      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      noteService.setToken(user.token)
    } catch (error) {
      console.error(error)
    }
  }

  return <RenderLoginForm handleLogin={handleLogin} />
}