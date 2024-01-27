import ChatInList from "@/app/messages/Chat";
import useApp from "@/hooks/useApp";
import { useSearchParams, useRouter } from "next/navigation";

export default function ChatList({ chats }) {
  const { users } = useApp();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = (value) => {
    const user = users.find((user) => user.name === value);
    router.push(`/messages/${user?.id}`)
  }

  if(users.length > 0  && searchParams.get('query')?.toString()) {
    return (
      <ul className="flex flex-col gap-2 mt-2">
        {users.map((user) => (
          <button 
            key={user.id}
            onClick={() => handleSearch(user.name)}
            className="flex items-center gap-2 p-2 rounded-md outline-none hover:bg-neutral-700"
          >
            <img
              src="/usersvg.svg"
              alt="avatar"
              className="rounded-full w-10 h-10"
            />
            <h1 className="tracking-widest text-neutral-300">{user.name}</h1>

          </button>
        ))}
      </ul>
    )
  }
  return (
      <ul className="flex flex-col gap-2">
        {!chats || chats.length === 0 ? (
          <p className="flex justify-center items-center h-full text-sm mt-10 tracking-widest text-neutral-500">
            No chats
          </p>
        ) : (
          chats.map((chat) => <ChatInList key={chat.id} chat={chat} />)
        )}
      </ul>
    );

}
