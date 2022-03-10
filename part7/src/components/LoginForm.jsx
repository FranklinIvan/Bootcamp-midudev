import { useState } from "react"
import { useEffect } from "react"
import { useLogin } from "../login/custom-hooks"

export const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const notifyError = message => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 3000)
  }

  const [login, result] = useLogin({notifyError})

  useEffect(() => {
    if(result.data){
      const {value: token} = result.data.login
      setToken(token)
      window.localStorage.setItem('phonenumbers-user-token', token)
    }
  }, [result.data])

  const handleSubmit = e => {
    e.preventDefault()
    login({ variables: { username, password } })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
    <h4>Login</h4>
    <small style={{color: 'red'}}>{errorMessage}</small>
    <form onSubmit={handleSubmit}>
      <div>
        Username: <input placeholder='Username' 
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        Password: <input placeholder='Password'
          type='password' 
          value={password}
          onChange={e => setPassword(e.target.value)} 
        />
      </div>
      <div>
        <button>log in</button>
      </div>
    </form>
  </div>
  )
}