"use client";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
let socket;

const axiosClient = axios.create({
  baseURL: "http://localhost:4000",
});

export const AppContext = createContext({});

export default function AppProvider({ children }) {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ id: "", name: "" });
  const [chat, setChat] = useState({});
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const router = useRouter();

  const login = async (username) => {
    const newUser = {
      name: username,
    };

    const { data } = await axiosClient.post("/users/login", newUser);
    if (!data.user) return;
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    router.push("/messages");
  };

  const getChats = async () => {
    const json = localStorage.getItem("user");
    const { id } = JSON.parse(json);

    const { data } = await axiosClient.get("/users/chats", {
      headers: {
        Authorization: `Bearer ${id}`,
      },
    });

    setChats(data.messages);
  };

  const searchUser = async (username) => {
    const { data } = await axiosClient.get(`/users/search/${username}`);
    setUsers(data.users);
  };

  const findChat = async (id) => {
    setLoading(true);
    try {
      const user = localStorage.getItem("user");
      const { id: idUser } = JSON.parse(user);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idUser}`,
        },
      };
      const { data } = await axiosClient.get(`/users/chat/${id}`, config);
      setChat(data.chat);
      setMessages(data.chat.messages);

      const socketChat = {
        chat: data.chat,
        user: idUser,
      }

      socket.emit("newChat", socketChat)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (message) => {
    const token = localStorage.getItem("user");
    const { id } = JSON.parse(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${id}`,
      },
    };

    try {
      const { data } = await axiosClient.post(
        "/users/messages/send",
        message,
        config
      );
      socket.emit("message", data.message);
      
    } catch (error) {
      console.log(error);
    }
  };

  const recieveMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const getOnlineUsers = async () => {
    const json = localStorage.getItem("user");
    const { id } = JSON.parse(json);
    const { data } = await axiosClient.get("/users/online",{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${id}`,
      }
    })
    setOnlineUsers(data.users)
  }

  const setNewChatSocket = (chat) => {
    const existe = chats.find((chatFind) => chatFind.id === chat.id);
    if (existe) return;
    setChats([...chats, chat]);
  }


  useEffect(() => {
    const auth = () => {
      const json = localStorage.getItem("user");
      if (!json) return;
      const { id, name } = JSON.parse(json);
      setUser({ id, name });
    };

    auth();
    socket = io("http://localhost:4000");

    if(!user) return

    const pollingInterval = setInterval(() => {
      getOnlineUsers()
    },3000)

    return () => {
      clearInterval(pollingInterval)
    }

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
        findChat,
        recieveMessage,
        messages,
        loading,
        onlineUsers,
        setNewChatSocket,
        onlineUsers
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
