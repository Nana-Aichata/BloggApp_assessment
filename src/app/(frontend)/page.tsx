/* 
'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const formRef = useRouter as any

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch(`/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('payload-token', data.token)
        router.push('/dashboard') 
      } else {
        setError(data.errors?.[0]?.message || 'Login failed')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-lg w-96">

        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="w-full bg-black text-white p-2 rounded hover:bg-zinc-800">
          Login
        </button>

        <p className="mt-4 text-center text-sm text-black">
          Don't have an account? <Link href="/signup" className="text-blue-600">Sign Up</Link>
        </p>
      </form>
    </div>
  )
}
  */

'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) return setError('Passwords do not match')

    try {
      const res = await fetch(`${window.location.origin}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username }),
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess(true)
        setTimeout(() => {
          setIsSignup(false) // Slide back to login
          setSuccess(false)
        }, 2000)
      } else {
        setError(data.errors?.[0]?.message || 'Signup failed')
      }
    } catch (err) {
      setError('Connection error. Check your MongoDB.')
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch(`${window.location.origin}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        router.push('/dashboard')
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    }
  }

  return (
  <div className="flex items-center justify-center min-h-screen bg-[#f6f5f7]">
    <div className="auth-container">
      
      {/* SIGN UP */}
      <div className={`form-container left-0 w-1/2 z-1 ${isSignup ? 'translate-x-full opacity-100 z-5 animate-show' : 'opacity-0'}`}>
        <form onSubmit={handleSignup} className="bg-white flex flex-col p-12 h-full justify-center items-center text-center">
          <h1 className="font-bold text-2xl mb-4 text-black">Create Account</h1>
          <input type="text" placeholder="Username" className="bg-[#eee] p-3 my-2 w-full rounded text-black" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="email" placeholder="Email" className="bg-[#eee] p-3 my-2 w-full rounded text-black" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="bg-[#eee] p-3 my-2 w-full rounded text-black" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="bg-[#ff4b2b] text-white rounded-full px-10 py-3 mt-4 font-bold uppercase text-xs">Sign Up</button>
        </form>
      </div>

      {/* SIGN IN */}
      <div className={`form-container left-0 w-1/2 z-2 ${isSignup ? 'translate-x-full' : ''}`}>
        <form onSubmit={handleLogin} className="bg-white flex flex-col p-12 h-full justify-center items-center text-center">
          <h1 className="font-bold text-2xl mb-4 text-black">Sign In</h1>
          <input type="email" placeholder="Email" className="bg-[#eee] p-3 my-2 w-full rounded text-black" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="bg-[#eee] p-3 my-2 w-full rounded text-black" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="bg-[#ff4b2b] text-white rounded-full px-10 py-3 mt-4 font-bold uppercase text-xs">Sign In</button>
        </form>
      </div>

      {/* OVERLAY */}
      <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-100 ${isSignup ? '-translate-x-full' : ''}`}>
        <div className={`bg-gradient-to-r from-[#ff4b2b] to-[#ff416c] text-white relative -left-full h-full w-[200%] transition-transform duration-600 ease-in-out ${isSignup ? 'translate-x-1/2' : 'translate-x-0'}`}>
          
          <div className="absolute flex flex-col items-center justify-center px-10 text-center top-0 h-full w-1/2">
            <h1 className="font-bold text-2xl">Welcome Back!</h1>
            <p className="text-sm my-5">To keep connected please login with your personal info</p>
            <button onClick={() => setIsSignup(false)} className="border border-white bg-transparent rounded-full px-10 py-3 font-bold uppercase text-xs">Sign In</button>
          </div>

          <div className="absolute right-0 flex flex-col items-center justify-center px-10 text-center top-0 h-full w-1/2">
            <h1 className="font-bold text-2xl">Hello, Friend!</h1>
            <p className="text-sm my-5">Enter your personal details and start journey with us</p>
            <button onClick={() => setIsSignup(true)} className="border border-white bg-transparent rounded-full px-10 py-3 font-bold uppercase text-xs">Sign Up</button>
          </div>

        </div>
      </div>

    </div>
  </div>
)
}


