import useApp from "@/hooks/useApp";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Chat({chat}) {
  const { user, onlineUsers } = useApp()
  const router = useRouter()
  const UserData = chat.users.find(userstate => userstate.id !== user.id)

  const [online, setOnline] = useState(false)

  const redirecttoChat = (id) => {
      router.push(`/messages/${id}`)
  }

  useEffect(() => {
    if(!UserData) return
    const isOnline = onlineUsers.find(user => user.id === UserData.id)
    if(isOnline) {
      setOnline(true)
    }else {
      setOnline(false)
    }
  },[onlineUsers])


  return (

    <li onClick={() => redirecttoChat(UserData.id)} className="flex items-center gap-2 hover:cursor-pointer p-2 hover:bg-neutral-600 rounded-md">
      <img src="/usersvg.svg" alt="avatar" className="rounded-full w-10 h-10" />
      <h1 className="tracking-widest text-sm text-white   ">{UserData ? UserData.name : 'Not found'}</h1>
      {online && <span className="w-3 h-3 ml-auto bg-green-500 rounded-full"></span>}
    </li>
  );
}
