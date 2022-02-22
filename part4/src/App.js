import { useDispatch } from 'react-redux'
import FilterNotes from './components/FilterNotes'
import FormNote from './components/FormNote'
import Notes from './components/Notes'
import notesServices from './services/notes'
import { initNotes } from './reducers/noteReducer'
import { useEffect } from 'react'

export default function App () {

  const dispatch = useDispatch()

  useEffect(() => {
    notesServices.getAllNotes().then(notes => {
      dispatch(initNotes(notes))
    })
  }, [dispatch])

  return (
    <div>
      <FormNote />
      <FilterNotes />

      <Notes />
    </div>
  )
}
