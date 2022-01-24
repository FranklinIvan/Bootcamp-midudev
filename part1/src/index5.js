import React from 'react'
import ReactDOM from 'react-dom'

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
    categories: ['sports', 'movies', 'games']
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
]

const Note = ({content, date, categories = []}) => {
  return (
   <li>
     <p>{content}</p>
     <small><time>{date}</time></small>
     {categories.map(category => 
       <ul key={category}> <li>{category}</li></ul>
     )}
   </li>
  )
 }

const App = () => {
  return (
    <ul>
      {notes.map(note => 
        (<Note key={note.id} content={note.content} date={note.date} categories={note.categories} />)
      )}
    </ul>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)