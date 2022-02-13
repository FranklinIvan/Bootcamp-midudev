import Toggleable from './Toggleable'

export default function RenderLoginForm ({ handleLogin, handleChangeCredentials, value }) {
  return (
    <Toggleable labelButton='show log in'>
      <form onSubmit={handleLogin}>
        <input
          type='text'
          onChange={handleChangeCredentials[0]}
          value={value[0]}
          placeholder='username'
        />
        <input
          type='password'
          onChange={handleChangeCredentials[1]}
          value={value[1]}
          placeholder='password'
        />
        <button>log in</button>
        <br />
        <br />
      </form>
    </Toggleable>
  )
}
