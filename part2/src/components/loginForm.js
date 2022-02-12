export default function RenderLoginForm ({ handleLogin, type, placeholder, handleChangeCredentials, value }) {
  return (
    <form onSubmit={handleLogin}>
      <input
        type={type[0]}
        onChange={handleChangeCredentials[0]}
        value={value[0]}
        placeholder={placeholder[0]}
      />
      <input
        type={type[1]}
        onChange={handleChangeCredentials[1]}
        value={value[1]}
        placeholder={placeholder[1]}
      />
      <button>log in</button>
      <br />
      <br />
    </form>
  )
}
