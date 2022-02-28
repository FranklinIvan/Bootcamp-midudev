import { useState, useRef } from 'react'
import { Button, Form } from 'react-bootstrap'
import Toggleable from './Toggleable'

export default function RenderCreateNoteForm ({ addNote }) {
  const [newNote, setNewNote] = useState('')
  const toggleRef = useRef()

  const handleChange = ({ target }) => setNewNote(target.value)
  const handleSubmit = e => {
    e.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }
    addNote(noteObject)
    setNewNote('')
    toggleRef.current.toggleVisibility()
  }

  return (
    <Toggleable ref={toggleRef} labelButton='create a note'>
      <h4>Create a note</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type='text'
            placeholder='write your new note'
            onChange={handleChange}
            value={newNote}
          />
        </Form.Group>
        <Button type='submit' variant='success'>save</Button>
      </Form>
      <br />
    </Toggleable>
  )
}
