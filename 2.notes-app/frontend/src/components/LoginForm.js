import PropTypes from 'prop-types'

export default function RenderLoginForm ({ handleSubmit, ...props }) {
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          onChange={props.handleUsernameChange}
          value={props.username}
          placeholder='username'
        />

        <input
          type='password'
          onChange={props.handlePasswordChange}
          value={props.password}
          placeholder='password'
        />

        <button id='form-login-button'>log in</button>
      </form>
    </div>
  )
}

RenderLoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}
