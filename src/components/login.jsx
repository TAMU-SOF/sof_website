'use client'
import { useState } from 'react'

export default function Login({ onSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/sheet/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (res.ok) {
      onSuccess()
    } else {
      const data = await res.json()
      setError(data.message)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-bold">Secure Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <button type="submit" className="bg-[#0E472B] text-white px-4 py-2 rounded transition transform duration-200 hover:scale-105">
          Login
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  )
}
