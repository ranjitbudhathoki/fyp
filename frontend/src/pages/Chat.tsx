import { useMutation, useQuery, useQueryClient } from 'react-query';
import Conversation from '../components/chat/Conversation';
import Message from '../components/chat/Message';
import axios from '../utils/axios-instance';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { AnimatePresence, motion } from 'framer-motion';
import isTypingData from '../services/isTyping.json';
import Lottie from 'lottie-react';
import { ClipLoader } from 'react-spinners';
function Chat({ socket }) {
  console.log('renderd');
  const { user } = useSelector((state: any) => state.auth);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();
  const [isTyping, setIsTyping] = useState(false);
  const messageCountRef = useRef<number>(0);

  const scrollRef = useRef<any>(null);

  const { data, isLoading } = useQuery(
    'allMatches',
    async () => {
      const res = await axios(`api/matches/${user.id}`);
      return res.data;
    },
    { refetchOnMount: true }
  );

  const matchedUsersData = data?.data?.matchedUsersData;

  const sendMessageMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(
        `api/matches/${currentChat?.matchId}/messages`,
        data
      );

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['chat-messages', currentChat?.matchId]);
    },

    onError: (error) => {
      console.log({ error: error });
    },
  });

  const { data: allMessages, isLoading: isMessageLoading } = useQuery(
    ['chat-messages', currentChat?.matchId],
    async () => {
      const res = await axios.get(
        `api/matches/${currentChat?.matchId}/messages`
      );
      return res?.data?.data;
    },

    {
      onSuccess: (data) => {
        setMessages(data);
      },

      enabled: Boolean(currentChat?.matchId),
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const msgObj = {
      matchId: currentChat.matchId,
      sentByUserId: user.id,
      text: message,
    };
    if (!message) toast.warning('Please enter a message');

    sendMessageMutation.mutate(msgObj);
    setMessage('');
  };

  useEffect(() => {
    if (!currentChat?.matchId) return;
    socket.emit('join-room', currentChat?.matchId);
    return () => {
      socket.emit('leave-room', currentChat?.matchId);
    };
  }, [currentChat?.matchId, socket]);

  useEffect(() => {
    socket.on('push-new-message', (event: any) => {
      const data = event.data;
      const queryKey = [...data.events].filter(Boolean);
      queryClient.invalidateQueries({ queryKey: queryKey });
    });
    return () => {
      socket.off('push-new-message');
    };
  }, [currentChat?.matchId, queryClient, socket]);

  useEffect(() => {
    socket.emit('new-message', {
      data: {
        events: ['chat-messages', currentChat?.matchId],
      },
    });
  }, [currentChat?.matchId, allMessages, socket]);

  useEffect(() => {
    if (messageCountRef.current < allMessages?.length) {
      scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
    messageCountRef.current = allMessages?.length || 0;
  }, [messages]);

  if (isMessageLoading)
    return (
      <ClipLoader
        color={'#8ad85c'}
        loading={isLoading}
        cssOverride={{ width: '40px', height: '40px' }}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );

  return (
    <div className="messenger text-white h-screen scroll-m-0">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          {matchedUsersData?.map((match) => (
            <div key={match.id} onClick={() => setCurrentChat(match)}>
              <Conversation match={match} />
              <hr className="text-custom-light-green" />
            </div>
          ))}
        </div>
      </div>

      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {allMessages?.map((msg) => (
                  <div ref={scrollRef}>
                    <Message
                      key={msg.id}
                      own={msg.sender.id === user.id}
                      msg={msg}
                      msgSender={msg.sender}
                    />
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom m-0">
                <input
                  className=" text-white  h-[50px] m-[-2px] flex items-center  w-full text-sm bg-gray-700 rounded-full px-3 focus:outline-none "
                  placeholder="write something..."
                  value={message}
                  onChange={(e: any) => setMessage(e.target.value)}
                ></input>
                <button
                  className="chatSubmitButton text-sm bg-custom-light-green m-2"
                  onClick={handleSubmit}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className="text-2xl noConversationText ">
              Open a conversation to chat
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
