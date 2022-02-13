import { useState } from 'react'

export default function RenderLoginForm ({ handleLogin, handleChangeCredentials, value }) {
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

        <button onClick={() => setLoginVisible(false)}>Cancel</button>
      </div>
    </>
  )
}
