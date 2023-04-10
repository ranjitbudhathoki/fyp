import { useMutation, useQuery, useQueryClient } from 'react-query';
import Conversation from '../components/chat/Conversation';
import Message from '../components/chat/Message';
import axios from '../utils/axios-instance';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { FlagIcon } from '@heroicons/react/24/solid';
import { ClipLoader } from 'react-spinners';
import Welcome from '../components/chat/Welcome';
import DeleteConfirmationModal from '../Modals/DeleteConfirmationModal';
function Chat({ socket }) {
  console.log('renderd');
  const { user } = useSelector((state: any) => state.auth);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();
  const messageCountRef = useRef<number>(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const scrollRef = useRef<any>(null);

  const { data, isLoading } = useQuery(
    'allMatches',
    async () => {
      const res = await axios(`api/matches/${user.id}`);
      return res.data;
    },
    { refetchOnMount: true, refetchOnWindowFocus: true }
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

  const unmatchMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(
        `api/matches/${currentChat?.matchId}/unmatch`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('allMatches');
      setCurrentChat(null);
    },
    onError: (error) => {
      console.log({ error: error });
    },
  });

  const reportMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.post(`api/users/${id}/report`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('User reported successfully');
    },
    onError: (error) => {
      console.log({ error: error });
    },
  });

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

  console.log('currentChat', currentChat);

  return (
    <div className="messenger text-white h-screen ml-[-30px]">
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
        <div className="chatBoxWrapper bg-custom-light-dark">
          {currentChat ? (
            <>
              <DeleteConfirmationModal
                isVisible={showConfirmationModal}
                message={`Do you want to report this User ?`}
                onCancel={() => setShowConfirmationModal(false)}
                onConfirm={() => {
                  setShowConfirmationModal(false);
                  reportMutation.mutate(currentChat?.id);
                }}
              />
              <div className="flex flex-row items-center p-2 ">
                <img
                  src={currentChat?.photo}
                  className="h-8 w-8 mr-3 rounded-lg"
                />
                <p className="ml-4 text-2xl">{currentChat?.username}</p>
                <button
                  onClick={() => unmatchMutation.mutate()}
                  type="button"
                  className="focus:outline-none text-black bg-yellow-400 mt-0 pt-1 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900 ml-auto"
                >
                  Un Match
                </button>
                <FlagIcon
                  onClick={() => setShowConfirmationModal(true)}
                  className="h-8 w-8 hover:text-custom-light-green hover:cursor-pointer ml-auto"
                />
              </div>
              <div className="chatBoxTop">
                {allMessages?.map((msg) => (
                  <div key={msg.id} ref={scrollRef}>
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
                <form
                  onSubmit={handleSubmit}
                  className="h-full w-full flex flex-row"
                >
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
                </form>
              </div>
            </>
          ) : (
            <Welcome username={user.username} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
