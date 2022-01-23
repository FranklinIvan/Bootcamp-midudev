import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({text}) => <h1>{text}</h1>
const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>
const Votes = ({votes}) => <p>Has {votes} votes</p>

const points = {
    'anecdote': 0, // This is the pointer to anecdotes

    votes: {
      0: 0, // If it hurts, do it more often
      1: 0, // Adding manpower to a late software project makes it later!
      2: 0, // ...
      3: 0, // ...
      4: 0, // ...
      5: 0, // ...
    }
    
}

const App = ({anecdotes}) => {
    
  const [selected, setSelected] = useState(points)
  
  const nRandom = Math.floor(Math.random() * (anecdotes.length - 0) + 0);

  const handleClickRandom = () => {
      const copy = {...selected}
      copy.anecdote = nRandom
      return setSelected(copy)
  }

  const handleClickVotes = () => {
      const copy = {...selected}
      copy.votes[selected.anecdote] += 1
      return setSelected(copy);
  }

  const mostVotes = Math.max(...Object.values(selected.votes));
  const anecdoteMostVotes = Object.values(selected.votes).findIndex(n => n === mostVotes);
  
  return (
    <div>
      <Title text={'Anecdote of the day'} />
      {anecdotes[selected.anecdote]}
      <Votes votes={selected.votes[selected.anecdote]} />
      <Button text={'vote'} handleClick={handleClickVotes} />
      <Button text={'next anecdote'} handleClick={handleClickRandom} />
      <Title text={'Anecdote whit most votes'} />
      {anecdotes[anecdoteMostVotes]}
      <Votes votes={mostVotes} />
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