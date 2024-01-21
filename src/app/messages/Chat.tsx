import { Chat } from "@/types";
import useApp from "@/hooks/useApp";

export default function Chat({chat}: {chat: Chat}) {
  const { user } = useApp()
  const UserData = chat.users.find(userstate => userstate.id !== user.id)
  return (
    <li className="flex items-center gap-2 p-2 hover:bg-neutral-600 rounded-md">
      <img src="/usersvg.svg" alt="avatar" className="rounded-full w-10 h-10" />
      <h1 className="tracking-widest text-sm text-white   ">{UserData ? UserData.name : 'Not found'}</h1>
    </li>
  );
}
