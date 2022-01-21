import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// const NoFeedbackGiven = () => {
//   return <p>No feedback given</p>
// }

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
  const average = all / 3;
  const positive = good / all * 100 || 0;

  return (
    <div>
      <Statistic text={'good'} value={good} />
      <Statistic text={'neutral'} value={neutral} />
      <Statistic text={'bad'} value={bad} />
      <Statistic text={'all'} value={all} />
      <Statistic text={'average'} value={average} />
      <Statistic text={'positive'} value={positive} />
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
      <button onClick={handleClickGood}>good</button>
      <button onClick={handleClickNeutral}>neutral</button>
      <button onClick={handleClickBad} >bad</button>
      <h1>Statistic</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)