import { useState } from "react"
import { useEditNumber } from "../persons/custom-hooks"

export const PhoneForm = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const notifyError = message => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 3000)
  }

  const [editNumber] = useEditNumber({notifyError})

  const handleSubmit = e => {
    e.preventDefault()
    editNumber({ variables: { name, phone } })
    
    setName('')
    setPhone('')
  }

  return (
    <div>
      <h4>Edit phone number</h4>
      <small style={{color: 'red'}}>{errorMessage}</small>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder='Name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input 
          placeholder='Phone'
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <div>
          <button>edit</button>
        </div>
      </form>
    </div>
  )
}
