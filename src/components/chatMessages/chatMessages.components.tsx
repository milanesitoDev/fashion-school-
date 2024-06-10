import ChatMessage from "../chatMessage/chatMessage.components";

import "./chatMessages.components.css";

const ChatMessages: React.FC = () => {
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
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
      </div>
      <button className="chat-messages__btn">Ver mas</button>
    </div>
  );
};

export default ChatMessages;
