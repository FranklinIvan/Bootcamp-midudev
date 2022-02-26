import { useState } from 'react'
import PropTypes from 'prop-types'

export default function RenderLoginForm ({ handleLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)
  const handleSubmit = async e => {
    e.preventDefault()

    const credentials = {
      username,
      password
    }
    handleLogin(credentials)

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          onChange={handleUsernameChange}
          value={username}
          placeholder='username'
        />
        <input
          type='password'
          onChange={handlePasswordChange}
          value={password}
          placeholder='password'
        />
        <button id='form-login-button'>log in</button>
        <br />
        <br />
      </form>
    </div>
  )
}

RenderLoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}
