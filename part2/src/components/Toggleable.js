import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

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
        <Button onClick={toggleVisibility}>{labelButton}</Button>
      </div>

      <div style={ShowWhenVisible}>
        {children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </>
  )
})

Toggleable.displayName = 'Toggleable'
Toggleable.propTypes = {
  labelButton: PropTypes.string
}

export default Toggleable
