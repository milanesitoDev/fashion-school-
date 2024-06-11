import ChatMessage from "../chatMessage/chatMessage.component";

import "./chatMessages.component.css";

type message = {
  text: string;
  time: Date;
};

type chat = {
  chat: string;
  messages: message[];
};

interface ChatMessagesProps {
  messages: chat[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="chat-messages">
      <h3 className="chat-messages__title">Mensajes</h3>
      <form action="" className="chat-messages__form">
        <input type="text" placeholder="Buscador..." required />
        <button type="submit">
          <i className="icon bx bx-search"></i>
        </button>
      </form>
      <div className="chat-messages__list">
        {messages.map((chat) => {
          return <ChatMessage chat={chat} />;
        })}
      </div>
      <button className="chat-messages__btn">Ver mas</button>
    </div>
  );
};

export default ChatMessages;
