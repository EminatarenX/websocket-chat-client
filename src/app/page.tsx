"use client"
import { useState } from "react"
import useApp from "@/hooks/useApp"

export default function Home() {
  const [username, setUsername] = useState("")
  const { login } = useApp()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(username.length < 1) return

    await login(username)
    setUsername("")
  }
  return (
    <main className="h-screen flex justify-center items-center">
      <form 
        onSubmit={handleSubmit}
        className="shadow-2xl  p-5 flex flex-col items-center bg-neutral-900 rounded-xl">
        <h1 className="text-3xl font-bold mb-5 text-white">Login</h1>
        <input
          className="border border-gray-300 w-80 p-2 mb-2 rounded"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
          <button type="submit" className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
          
      </form>
    </main>
  )
}
