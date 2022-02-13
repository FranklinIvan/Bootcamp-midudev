import { useState } from 'react'

export default function RenderLoginForm ({ handleLogin, type, placeholder, handleChangeCredentials, value }) {
  const [loginVisible, setLoginVisible] = useState(false)

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const ShowWhenVisible = { display: loginVisible ? '' : 'none' }

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>Show log in</button>
      </div>

      <div style={ShowWhenVisible}>
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

        <button onClick={() => setLoginVisible(false)}>Cancel</button>
      </div>
    </>
  )
}
