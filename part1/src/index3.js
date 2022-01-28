import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Ejercicios: 1.6.-1.14.
const NotFeedbackGiven = () => <p>No feedback given</p>

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const Statistic = ({text, value}) => {
  return (
    <table>

      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
        <tr>
          <td>-----------</td>
          <td>-----------</td>
        </tr>
      </tbody>
      
    </table>
  )
  
}

const Statistics = ({good, neutral, bad}) => {
  
  const all = good + neutral + bad;
  const average = (all / 3).toFixed(1)
  const positive = (good / all * 100 || 0).toFixed(1);

  return (
    <div>
      <Statistic text={'good'} value={good} />
      <Statistic text={'neutral'} value={neutral} />
      <Statistic text={'bad'} value={bad} />
      <Statistic text={'all'} value={all} />
      <Statistic text={'average'} value={average} />
      <Statistic text={'positive'} value={positive + ' %'} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    return setGood(prevClick => prevClick + 1);
  }

  const handleClickNeutral = () => {
    return setNeutral(neutral + 1);
  }

  const handleClickBad = () => {
    return setBad(bad + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={'good'} handleClick={handleClickGood} />
      <Button text={'neutral'} handleClick={handleClickNeutral} />
      <Button text={'bad'} handleClick={handleClickBad} />
      <h1>Statistics</h1>
      {
        good === 0 && neutral === 0 && bad === 0
        ? <NotFeedbackGiven />
        : <Statistics good={good} neutral={neutral} bad={bad}/>
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