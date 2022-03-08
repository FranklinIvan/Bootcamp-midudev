import { useState } from "react"
import { useAddPerson } from "../persons/custom-hooks"

export const PersonForm = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  
  const [createPerson] = useAddPerson()

  const handleSubmit = e => {
    e.preventDefault()

    createPerson({ variables: { name, phone, street, city } })
    
    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  return (
    <div>
      <h4>Add new person</h4>
      <form onSubmit={handleSubmit}>
        <input placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
        <input placeholder='Phone' value={phone} onChange={e => setPhone(e.target.value)} />
        <input placeholder='City' value={city} onChange={e => setCity(e.target.value)} />
        <input placeholder='Street' value={street} onChange={e => setStreet(e.target.value)} />
        <div>
          <button>add</button>
        </div>
      </form>
    </div>
  )
}