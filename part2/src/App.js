import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import NoteDetail from "./components/NoteDetail";
import Notes from './Notes'
import noteService from './services/notes'

const Home = () => <h1>Home</h1>
const Users = () => <h1>Users</h1>

const inlinesStyles = {
  padding: 5
}

function App() {

  const [notes, setNotes] = useState([])

  useEffect(() => {
    noteService.getAll().then(initialNotes => setNotes(initialNotes))
  }, [])

  return (
    <BrowserRouter>
      
      <header>
        <Link to="/" style={inlinesStyles}>
          Home
        </Link>
        <Link to="/notes"  style={inlinesStyles}>
          Notes
        </Link>
        <Link to="/users"  style={inlinesStyles}>
          Users
        </Link>
      </header>

      <Routes>
        <Route path='/' element={ <Home /> } /> 
        <Route path='/notes' element={ <Notes /> } /> 
        <Route path='/notes/:id' element={ <NoteDetail notes={notes}/> } /> 
        <Route path='/users' element={ <Users /> } /> 
      </Routes>
      
    </BrowserRouter>
  )
}

export default App