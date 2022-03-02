import { useState } from "react"

const App = () => {
  const [counter, setCounter] = useState(0)
  const [values, setValues] = useState([])

  const handleClick = () => {
    setCounter(counter + 1)
    setValues(values.concat(counter))
  }

  return (
    <div className='container'>
      <h3>I always put 'hi there', im gonna change a little bit</h3>
      <button onClick={handleClick}>press this</button>
      <h1>{counter}</h1>
    </div>
  )
}

export default App