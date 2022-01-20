import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => <h1>{course.name}</h1>
const Content = ({ parts }) => {

  const part1 = parts[0];
  const part2 = parts[1];
  const part3 = parts[2];

  return (
    <div>
      <p>{part1.name} {part1.exercises}</p>
      <p>{part2.name} {part2.exercises}</p>
      <p>{part3.name} {part3.exercises}</p>
    </div>
  )
}

const Total = ({ parts }) => {

  const part1 = parts[0];
  const part2 = parts[1];
  const part3 = parts[2];

  return <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)