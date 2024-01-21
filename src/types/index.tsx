export type Message = {
    id: string;
    content: string;
    sender: string;
}

export type MessageChatType = {
    id: string;
    chatId: string;
    userId: string;
    createdAt: string;
    text: string;
    user: User;

}

export type NewMessageType = {
    text: string;
    userId: string;
    chatId: string;
}

export type User = {
    id: string;
    name: string;
}

export type Chat = {
    id: string;
    messages: Message[];
    createdAt: string;
    updatedAt: string;
    users: User[];
}