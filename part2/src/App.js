import React from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import NoteDetail from "./components/NoteDetail";
import Notes from './Notes'
import Login from "./Login";
import { useUser } from "./hooks/useUser";
import { useNotes } from "./hooks/useNotes";

const Home = () => <h1>Home</h1>
const Users = () => <h1>Users</h1>

const inlinesStyles = {
  padding: 5
}

function App() {
  const { notes } = useNotes()
  const { user } = useUser() // eslint-disable-line

  return (
    <BrowserRouter>
      
      <header>
        <Link to="/" style={inlinesStyles}>Home</Link>
        <Link to="/notes"  style={inlinesStyles}>Notes</Link>
        <Link to="/users"  style={inlinesStyles}>Users</Link>
        <Link to="/login"  style={inlinesStyles}>Login</Link>
      </header>

      <Routes>
        <Route path='/' element={ <Home /> } /> 
        <Route path='/notes' element={ <Notes /> } /> 
        <Route path='/notes/:id' element={ <NoteDetail notes={notes}/> } /> 
        <Route path='/users' element={ <Users /> } /> 
        <Route path='/login' element={ <Login /> } />
      </Routes>
      
    </BrowserRouter>
  )
}

export default App