"use client";
import { createContext, ReactNode, useState, useEffect } from "react";
import { Message, User, Chat, NewMessageType } from "@/types";
import axios from "axios";
import { useRouter } from 'next/navigation'

const axiosClient = axios.create({
  baseURL: "http://localhost:4000",
})

export const AppContext = createContext({
  chats: [] as Chat[],
  user: {} as User,
  login: (username: string) => {},
  getChats: () => {},
  chat: null,
  users: [] as User[],
  searchUser: (username: string) => {},
  findChat: (id: string) => {},
  sendMessage: (message: NewMessageType) => {}
});

export default function AppProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>({ id: "", name: "" });
  const [chat, setChat] = useState(null)

  const router = useRouter()

  const login = async (username: string) => {
    const newUser = {
      name: username,
    };

    const { data } = await axiosClient.post(
      "/users/login",
      newUser
    );
    if(!data.user) return
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user))
    router.push('/messages')
  };

  const getChats = async() => {

    const json = localStorage.getItem('user')
    const {id} = JSON.parse(json as string)

    const { data } = await axiosClient.get("/users/chats",{
      headers: {
        Authorization: `Bearer ${id}`
      }
    });

    setChats(data.messages);

  }

  const searchUser = async (username: string) => {
    const { data } = await axiosClient.get(`/users/search/${username}`)
    setUsers(data.users)
  }

  const findChat = async (id: string) => {
    const user = localStorage.getItem('user')
    const { id: idUser } = JSON.parse(user as string)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idUser}`
      }
    }
    const { data } = await axiosClient.get(`/users/chat/${id}`, config)

    setChat(data.chat)
    
  }

  const sendMessage = async(message: NewMessageType) => {
    const token = localStorage.getItem('user')
    const { id } = JSON.parse(token as string)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${id}`
      }
    }

    try {
      const { data } = await axiosClient.post('/users/messages/send', message, config)
      setChat({...chat, messages: [...chat.messages, data.message]})

    } catch (error) {
      console.log(error)
    }


  }

  useEffect(() => {
    const auth = () => {
      const json = localStorage.getItem('user')
      if(!json) return
      const {id, name} = JSON.parse(json as string)
      setUser({id, name})
    };
      
    auth();
  }, []);
  return (
    <AppContext.Provider
      value={{
        chats,
        sendMessage,
        user,
        login,
        getChats,
        chat,
        searchUser,
        users,
        findChat
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
