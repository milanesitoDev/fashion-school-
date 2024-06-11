import "./chatMessage.component.css";

type message = {
  text: string;
  time: Date;
};

type chat = {
  chat: string;
  messages: message[];
};

interface ChatMessageProps {
  chat: chat;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ chat }) => {
  return (
    <div className="chat-message">
      <img src="images/profile.jpg" alt="Profile" />
      <div className="chat-message__info">
        <p className="chat-message__name">{chat.chat}</p>
        <p className="chat-message__text">
          {chat.messages[chat.messages.length - 1].text}
        </p>
      </div>
      <div className="chat-message__msg-info">
        <p className="chat-message__time">
          {`${chat.messages[
            chat.messages.length - 1
          ].time.getHours()}:${chat.messages[
            chat.messages.length - 1
          ].time.getMinutes()}`}{" "}
          pm
        </p>
        <p className="chat-message__number">{chat.messages.length}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
