import React from 'react'
import ReactDOM from 'react-dom'

// 2.1.-2.5.
const Header = ({ name }) => {
  return <h1>{name}</h1>
}

const Content = ({ parts = [] }) => {
  return (
    <div>
      {parts.map(part => {
        return <p>{part.name}</p>
      })}
    </div>
  )
}

const Courses = ({courses}) => {
  return (
    <section>
      {courses.map(course => 
        <Header key={course.id} name={course.name} />
      )}
      {courses.map(course => 
        <Content parts={course.parts} />  
      )}
    </section>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]

  return <Courses courses={courses} />
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)