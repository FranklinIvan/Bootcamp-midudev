import NewNote from './components/NewNote'
import Notes from './components/Notes'

export default function App () {
  
  const filterSelected = value => {
    console.log(value)
  }

  return (
    <div>
      <NewNote />
      <div>
        All
        <input type='radio' name='filter' onChange={() => filterSelected('all')} />
        
        Important
        <input type='radio' name='filter' onChange={() => filterSelected('important')} />
        
        not Important
        <input type='radio' name='filter' onChange={() => filterSelected('not important')} />
      </div>
      <Notes />
    </div>
  )
}
