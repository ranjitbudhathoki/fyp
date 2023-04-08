import './conversation.css';

function Conversation({ match }) {
  return (
    <div className="conversation">
      <img className="conversationImg" src={match.photo} alt={match.username} />
      <span className="conversationName text-lg">{match.username}</span>
    </div>
  );
}

export default Conversation;
