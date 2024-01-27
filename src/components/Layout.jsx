import useApp from "@/hooks/useApp"
import {useState} from "react"
import Image from "next/image"
import SearchBar from "@/app/messages/SearchBar"
import ChatsList from "@/app/messages/ChatList"

export default function Layout({ children }) {
  const { sendMessage, user, chat, chats } = useApp()
  const [message, setMessage] = useState("")

  const send = (e) => {
    e.preventDefault()
    if (!message) return
    const newMessage = {
        text: message,
        userId: user.id,
        chatId: chat ? chat.id : undefined,
    }

    sendMessage(newMessage)
    setMessage("")
  }
  return (

    <main className="flex gap-2 h-screen p-3">

        <aside className="flex flex-col w-1/4 bg-neutral-800 p-2 rounded-xl">
            <div className=" p-2 flex items-center gap-2 rounded">
                <Image src="/usersvg.svg"  alt="avatar" className="rounded-full w-10 h-10" width={10} height={10}/>
                <h1 className="tracking-widest text-neutral-200">{user.name}</h1>
            </div>
            <div className="flex flex-col">
                <h1 className=" text-xl text-neutral-400 mt-5">Chats</h1>
                <div id="new">

                    <SearchBar />
                </div>
                <ChatsList chats={chats}/>  
            </div>
        </aside>
        <section className="w-3/4 flex flex-col bg-neutral-800 rounded-xl">   
            <div className="overflow-y-auto scrollbar-hide overflow-hidden h-full">
                {children}
            </div>
            <form onSubmit={send} className={`flex gap-2 py-5 px-2 ${!chat ? 'hidden' : ''}`}>
                <input type="text" className="outline-none bg-neutral-600 rounded-md p-2 w-full text-white" 
                    value={message} onChange={e => setMessage(e.target.value)}
                />
                <button type="submit" className=" bg-blue-500 text-white w-12 h-12 rounded-full">{'>'}</button>
            </form>
        </section>
    </main>

  )
}
