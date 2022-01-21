import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from 'react'


const Title = () => {
  console.log('Title render');
  return <h1>Hi there</h1>
}
const Counter = ({ number }) => {
  console.log('Counter Render');
  return <p>{number}</p>
}

const App = () => {

  const [count, setCount] = useState(0);

  console.log('render');

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

// const Header = ({ course }) => <h1>{course.name}</h1>
// const Content = ({ parts }) => {

//   const part1 = parts[0];
//   const part2 = parts[1];
//   const part3 = parts[2];

//   return (
//     <div>
//       <p>{part1.name} {part1.exercises}</p>
//       <p>{part2.name} {part2.exercises}</p>
//       <p>{part3.name} {part3.exercises}</p>
//     </div>
//   )
// }

// const Total = ({ parts }) => {

//   const part1 = parts[0];
//   const part2 = parts[1];
//   const part3 = parts[2];

//   return <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
// }

// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name: 'State of a component',
//         exercises: 14
//       }
//     ]
//   }

//   return (
//     <div>
//       <Header course={course} />
//       <Content parts={course.parts} />
//       <Total parts={course.parts} />
//     </div>
//   )
// }

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)