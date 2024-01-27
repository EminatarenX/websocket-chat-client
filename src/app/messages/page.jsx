"use client"
import { useEffect } from "react"
import MessagesLayout from "@/components/Layout"
import useApp from "@/hooks/useApp"
import { io } from "socket.io-client"
let socket

export default function Page() {


    const {user, getChats, setNewChatSocket} = useApp()

    useEffect(() => {
        getChats()
        if(!user) return
        socket = io('http://localhost:4000')
        socket.emit('userConnected', user)
        socket.on('newChat', chat => {
            setNewChatSocket(chat)
        })

        return () => {
            socket.off('newChat')
            socket.off('userConnected')
        }
    },[user])

    return (
    <MessagesLayout>
       <div
         className="flex items-center justify-center h-full w-full rounded-xl"

       >
            <h1 className="text-2xl text-neutral-500">Select a chat</h1>

       </div>
        
    </MessagesLayout>
  )
}
