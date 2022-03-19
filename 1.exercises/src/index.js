import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from 'react'

// Ejercicio: no sé cuál es...
const Title = () => {
  return <h1>Hi there</h1>
}
const Counter = ({ number }) => {
  return <p>{number}</p>
}

const App = () => {
  const [count, setCount] = useState(0);

  const handleClick = event => {
    if (event) return () => setCount(count + 1);
    else return () => setCount(count - 1);
  }

  const handleClickReset = () => setCount(0);

  const isEven = count % 2 === 0;
  const msgEven = isEven ? 'es par' : 'es impar';

  return (
    <div>
      <Title />
      <Counter number={count} />
      <p>{msgEven}</p>
      <button onClick={handleClick(true)}>Increment</button>
      <button onClick={handleClick(false)}>Decrementar</button>
      <br />
      <button onClick={handleClickReset}>Reset</button>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)