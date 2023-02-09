import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state: any) => state.auth);
  const posts = [
    {
      id: '123',
      title: user.photoUrl,
      content: 'this sucks',
    },
  ];
  return (
    <div className="flex flex-col items-center p-6">
      <div className="flex items-center">
        <img
          src={user.photoUrl}
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div className="flex flex-col">
          <h1 className="text-lg font-bold">{user.name}</h1>
          <p className="text-gray-600">@{user.displayName}</p>
        </div>
      </div>
      <button className="bg-blue-500 text-white font-bold py-2 px-4 mt-4 rounded">
        Update Profile
      </button>
      {posts.map((post) => (
        <div key={post.id} className="mt-6 bg-white rounded p-4 shadow">
          <p className="text-lg font-bold">{post.title}</p>
          <p className="text-gray-600 mt-2">{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Profile;
