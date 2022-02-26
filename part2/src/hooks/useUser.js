import { useEffect, useState } from "react"
import noteService from '../services/notes'

export const useUser = () => {
    const [user, setUser] = useState(null)
  
    useEffect(() => {
      const loggedUser = window.localStorage.getItem('loggedNoteAppUser')
      if (loggedUser) {
        const user = JSON.parse(loggedUser)
        setUser(user)
        noteService.setToken(user.token)
      }
    }, [])
  
    return {
      user
    }
}