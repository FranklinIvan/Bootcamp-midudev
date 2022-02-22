import FilterNotes from './components/FilterNotes'
import FormNote from './components/FormNote'
import Notes from './components/Notes'

export default function App () {

  return (
    <div>
      <FormNote />
      <FilterNotes />

      <Notes />
    </div>
  )
}
