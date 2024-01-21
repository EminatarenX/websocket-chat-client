"use client";
import MessagesLayout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import { Message as Messagetype, User } from "@/types";
import Message from "@/app/messages/Message";

import useApp from "@/hooks/useApp";

type ParamsType = {
  params: {
    id: string
  }
}
export default function page({params}: ParamsType) {
  const { user, findChat, chat } = useApp();
  const [ friendName, setFriendName ] = useState<string>()


  useEffect(() => {
    findChat(params.id)
    
  },[])
  useEffect(() => {
    const filterFriendName = () =>{
      const friend = chat?.users?.find((userFind: User) => userFind.id !== user.id);
      setFriendName(friend?.name)
    }
    filterFriendName()
  },[chat])

  
  return (
    <MessagesLayout>
      <header className="flex gap-5 items-center p-3 bg-neutral-700 rounded-t-xl">
        {
          //user Icon
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        
        }
        <h1 className="tracking-widest text-white capitalize">{friendName && friendName}</h1>
      </header>
      {!chat ? (
        <p className="flex justify-center items-center h-full text-2xl tracking-widest text-neutral-500">
          No messages
        </p>
      ) : (
        <ul className="flex flex-col gap-2 p-2">
          {chat.messages.map((message) => (
            <Message key={message.id} message={message} user={user} />
          ))}
        </ul>
      )}
    </MessagesLayout>
  );
}
