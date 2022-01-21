import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from 'react'

const WarningNotUsed = () => {
  return <p>Todavía no se ha usado el contador</p>
}
const ListOfClicks = ({clicks}) => {
  return <p>{clicks.join(', ')}</p>
}

const App = () => {

  const [clicks, setClicks] = useState([]);

  const handleClickLeft = () => {
    setClicks(prevClicks => ([...prevClicks, 'L']));
  }

  const handleClickRight = () => {
    setClicks(prevClicks => ([...prevClicks, 'R']));
  }

  const handleClickReset = () =>{
    setClicks([]);
  }

  const left = clicks.filter(l => l === 'L');
  const right = clicks.filter(r => r === 'R');

  return (
    <div>
      {left.length}
      <button onClick={handleClickLeft}>left</button>
      <button onClick={handleClickRight}>right</button>
      {right.length}
      <p>
        <button onClick={handleClickReset} >reset</button>
      </p>
      <p>Clicks totales: {clicks.length}</p>
      {clicks.length === 0
        ? <WarningNotUsed />
        : <ListOfClicks clicks={clicks} />
      }
      
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)