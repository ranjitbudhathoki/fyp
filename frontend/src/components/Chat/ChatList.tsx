import React from 'react';

const chatList = [
  {
    id: 1,
    name: 'John Doe',
    lastMessage: 'Hey, how are you doing?',
    time: '10:30 AM',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    lastMessage: 'Can you send me the report?',
    time: 'Yesterday',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    lastMessage: 'Thanks for your help!',
    time: 'Monday',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: 4,
    name: 'Sarah Brown',
    lastMessage: 'See you later!',
    time: 'Sunday',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
];

const ChatList = () => {
  return (
    <div className=" max-w-xs bg-black h-screen overflow-y-scroll">
      {chatList.map((chat) => (
        <div
          key={chat.id}
          className="p-4 border-b border-gray-300 flex items-center"
        >
          <div className="w-12 h-12 mr-4">
            <img
              className="w-full h-full object-cover rounded-full"
              src={chat.image}
              alt={chat.name}
            />
          </div>
          <div>
            <div className="font-bold">{chat.name}</div>
            <div className="text-sm text-gray-700">{chat.time}</div>
            <div className="text-sm ">{chat.lastMessage}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
