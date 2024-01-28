"use client";
import MessagesLayout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import Message from "@/app/messages/Message";
import { io } from "socket.io-client";
let socket;


import useApp from "@/hooks/useApp";

export default function Page({params}) {
  const {getChats, user, findChat, chat, recieveMessage, messages, loading } = useApp();
  const [ friendName, setFriendName ] = useState()

  useEffect(() => {
    findChat(params.id)
      socket = io(`${process.env.NEXT_PUBLIC_API_URL}`)

      socket.on('newMessage', (message) => {
        recieveMessage(message)
      })
      getChats()
     
  },[])


  useEffect(() => {
    const filterFriendName = () =>{
      const friend = chat?.users?.find((userFind) => userFind.id !== user.id);
      setFriendName(friend?.name)
    }
    filterFriendName()
    
    
    socket.emit('chat', chat?.id)
  },[chat])

  
  return (
    <MessagesLayout>
      <header className="sticky top-0 flex gap-5 items-center p-3 bg-neutral-700 rounded-t-xl">
        {
          //user Icon
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        
        }
        <h1 className="tracking-widest text-white capitalize">{friendName && friendName}</h1>
      </header>
      {messages?.length === 0 || loading ? (
        <p className="flex justify-center items-center h-full text-2xl tracking-widest text-neutral-500">
          No messages
        </p>
      ) : (
        <ul className="flex flex-col gap-2 p-2" id="chat">
          {messages?.map((message, index) => (
            <Message key={message.id} length={messages.length} index={index} message={message} user={user} />
          ))}
        </ul>
      )}
    </MessagesLayout>
  );
}
