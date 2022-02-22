import { useDispatch } from 'react-redux'
import FilterNotes from './components/FilterNotes'
import FormNote from './components/FormNote'
import Notes from './components/Notes'
import { initNotes } from './reducers/noteReducer'
import { useEffect } from 'react'

export default function App () {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initNotes())
  }, [dispatch])

  return (
    <div>
      <FormNote />
      <FilterNotes />

      <Notes />
    </div>
  )
}
