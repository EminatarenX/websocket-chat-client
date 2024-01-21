"use client"
import { useEffect } from "react"
import MessagesLayout from "@/components/Layout"
import useApp from "@/hooks/useApp"

export default function Page() {


    const {user, getChats} = useApp()

    useEffect(() => {
        getChats()
    },[])
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
