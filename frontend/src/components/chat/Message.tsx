import { useSelector } from 'react-redux';
import './message.css';
import { format } from 'timeago.js';
function Message({ own, msg, msgSender }) {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className={own ? 'message own' : 'message'}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={msgSender.id === user.id ? user.photoUrl : msgSender.photoUrl}
          alt=""
        />
        <p className="messageText text-sm">{msg.text}</p>
      </div>
      <div className="messageBottom">{format(msg.createdAt)}</div>
    </div>
  );
}

export default Message;
