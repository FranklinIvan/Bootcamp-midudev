import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from "prop-types"

const Toggleable = forwardRef(({ children, labelButton = 'show me' }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const ShowWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{labelButton}</button>
      </div>

      <div style={ShowWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  )
})

Toggleable.displayName = 'Toggleable'
Toggleable.propTypes = {
  labelButton: PropTypes.string
}

export default Toggleable
