import { useState, useEffect } from 'react'
import './App.css'
import UserTable from './components/UserTable'
import UserForm from './components/UserForm'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://userapp6.onrender.com/users')
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      const data = await response.json()
      setUsers(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="container">
      <header>
        <h1>MY USER APP</h1>
      </header>
      <h2>List of Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && (
        <>
          <UserForm refreshUsers={fetchUsers} />
          <UserTable users={users} refreshUsers={fetchUsers} />
        </>
      )}
      <footer>
        <p>Design and Developed By Nikhil Rawat</p>
      </footer>
    </div>
  )
}

export default App