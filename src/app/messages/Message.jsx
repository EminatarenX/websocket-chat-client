import { useRef, useEffect } from "react";
export default function Message({ message, user, index, length }) {
  const lastChild = useRef(null);
  useEffect(() => {
    if(index === length - 1) {
      lastChild.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <li 
      ref={index === length - 1 ? lastChild : null}
      key={message.id}
      className={` rounded-2xl p-3 min-w-14 flex justify-center max-w-[80%] ${
        message.userId === user.id ? "bg-sky-500 ml-auto" : "bg-neutral-700 mr-auto"
      }`}
    >
      <p className="break-all text-white">{message.text}</p>
    </li>
  );
}
