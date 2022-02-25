import React, { useState } from "react";

const Home = () => <h1>Home</h1>

const Notes = () => <h1>Notes</h1>

const Users = () => <h1>Users</h1>

const inlinesStyles = {
  padding: 5
}

function App() {
  const [page, setPage] = useState(() => {
    const { pathname } = window.location
    const page = pathname.slice(1)
    return page
  })
  
  const handlePages = () => {
    if (page === 'notes') return <Notes />
    else if (page === 'users') return <Users />
    else return <Home />
  }

  const toPage = page => e => {
    e.preventDefault()

    window.history.pushState(null, '', `${page}`)
    setPage(page)
  }

  return (
    <div>
      <header>
        <a href="#" onClick={toPage('home')} style={inlinesStyles}> {/* eslint-disable-line */}
          Home
        </a>
        <a href="#" onClick={toPage('notes')} style={inlinesStyles}> {/* eslint-disable-line */}
          Notes
        </a>
        <a href="#" onClick={toPage('users')} style={inlinesStyles}> {/* eslint-disable-line */}
          Users
        </a>
      </header>
      {handlePages()}
    </div>
  )
}

export default App