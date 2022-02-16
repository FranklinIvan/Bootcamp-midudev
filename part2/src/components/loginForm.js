import { useState } from 'react'
import Toggleable from './Toggleable'
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
    <Toggleable labelButton='show log in'>
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
    </Toggleable>
  )
}

RenderLoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}
