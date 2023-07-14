'use client'

import { useState } from 'react'
import { signIn } from 'next-auth'
import Nav from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    })

    if (result.error) {
      console.error(result.error)
    } else {
      window.location.href = '/'
    }
  }

  return (
    <>
    <Nav />
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    <Footer />
    </>
  )
}
