import { useDispatch } from "react-redux"

export default function FilterNotes () {
  const dispatch = useDispatch()
  
  const filterSelected = value => {
    dispatch({type: value})
  }

  return (
    <div>
      all
      <input 
        type='radio'
        name='filter'
        onChange={() => filterSelected('@set_filter/all')}
      />

      important
      <input 
        type='radio'
        name='filter'
        onChange={() => filterSelected('@set_filter/important')}
      />

      not Important
      <input 
        type='radio'
        name='filter'
        onChange={() => filterSelected('@set_filter/not_important')}
      />
    </div>
  )
}