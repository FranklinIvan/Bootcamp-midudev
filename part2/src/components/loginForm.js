import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'

export default function RenderLoginForm ({ handleSubmit, ...props }) {
  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group id='username'>
          <Form.Control
            type='text'
            onChange={props.handleUsernameChange}
            value={props.username}
            placeholder='username'
          />
        </Form.Group>

        <Form.Group id='password'>
          <Form.Control
            type='password'
            onChange={props.handlePasswordChange}
            value={props.password}
            placeholder='password'
          />
        </Form.Group>
        <Button type='submit' id='form-login-button'>log in</Button>
      </Form>
    </div>
  )
}

RenderLoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}
