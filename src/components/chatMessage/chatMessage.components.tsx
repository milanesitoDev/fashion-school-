import "./chatMessage.components.css"

const ChatMessage: React.FC = () => {
  return (
    <>
      <div className="chat-message">
        <img src=" " alt="Profile" />
        <div className="chat-message__info">
          <p className="chat-message__name">Carlos Perez</p>
          <p className="chat-message__text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, labore
            harum soluta velit corporis numquam dolor nihil rem magnam
            perspiciatis architecto, odit qui est tenetur natus sint, beatae
            commodi quibusdam?
          </p>
          <div className="chat-message__msg-info">
            <p className="chat-message__time">12:45 pm</p>
            <p className="chat-message__number">2</p>

          </div>
        </div>
      </div>
    </>
  );
};
export default ChatMessage;