import { MessageChatType, User } from "@/types";

export default function Message({ message, user }: { message: MessageChatType; user: User}) {
  return (
    <li
      key={message.id}
      className={`border border-gray-300 rounded-md p-2 max-w-[80%] ${
        message.userId === user.id ? "bg-green-100 ml-auto" : "bg-blue-100 mr-auto"
      }`}
    >
      <p
        className={`text-[8px] ${
          message.userId === user.id ? "text-neutral-600" : "text-blue-800"
        }`}
      >
        {message.userId === user.id ? "You" : message.user.name}
      </p>
      <p className="break-all">{message.text}</p>
    </li>
  );
}
