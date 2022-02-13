import { useState } from 'react'

export default function Toggleable ({ children, labelButton }) {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const ShowWhenVisible = { display: visible ? '' : 'none' }

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>{labelButton}</button>
      </div>

      <div style={ShowWhenVisible}>
        {children}
        <button onClick={() => setVisible(false)}>Cancel</button>
      </div>
    </>
  )
}
