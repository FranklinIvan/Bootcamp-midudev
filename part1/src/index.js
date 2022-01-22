import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const points = {
    'anecdote': 0, // This is the initial state

    0: 0, // If it hurts, do it more often..
    1: 0, // Adding manpower to a late software project makes it later!
    2: 0, // ...
    3: 0, // ...
    4: 0, // ...
    5: 0, // ...
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(points)
  
  const randomNumber = Math.floor(Math.random() * (anecdotes.length - 0) + 0);

  const handleClickRandom = () => {
      const copy = {...selected}
      copy.anecdote = randomNumber
      return setSelected(copy)
  }

  const handleClickVotes = () => {
      const copy = {...selected}
      copy[selected.anecdote] += 1
      return setSelected(copy);
  }

  return (
    <div>
      {anecdotes[selected.anecdote]}
      <br />
      <p>Has {selected[selected.anecdote]} votes</p>
      <button onClick={handleClickVotes}>vote</button>
      
      <button onClick={handleClickRandom}>next anecdote</button>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',

  'Adding manpower to a late software project makes it later!',

  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',

  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',

  'Premature optimization is the root of all evil.',

  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)