'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Signup(){
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false) // Added success state
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setSuccess(false) // Reset success on new attempt

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        try {
            const response = await fetch(`${window.location.origin}/api/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, username }),
            })

            const data = await response.json()

            if (response.ok) {
                setSuccess(true)
                setTimeout(() => {
                    router.push('/') 
                }, 2000)
            } else {
                setError(data.errors?.[0]?.message || 'Signup failed');
            }
        } catch (err) {
          console.error("Connection Error:", err)
          setError('Check your terminal for MongoDB connection errors.')
        }
    }

    return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-lg w-96">

        <h1 className="text-2xl font-bold mb-6 text-center text-black">Create Account</h1>
        {error && <p className="text-red-500 mb-4 text-sm font-semibold">{error}</p>}
        {/* Added success message display */}
        {success && (
            <p className="text-green-600 mb-4 text-sm font-semibold text-center italic">
                Signup successful! Redirecting to login...
            </p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-black">Username</label>
          <input
            type="text"
            className="w-fu ll p-2 border rounded text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-black">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-black">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-black">Confirm Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded text-black"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="w-full bg-black text-white p-2 rounded hover:bg-zinc-800">
          Sign Up
        </button>
        
        <p className="mt-4 text-center text-sm text-black">
          Already have an account? <Link href="/" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  )
}
