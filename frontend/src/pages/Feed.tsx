import React, { useState } from 'react';
import axios from '../utils/axios-instance';
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import MatchPost from '../components/Feed/MatchPost';
import { toast } from 'react-toastify';
import Overlay from '../Modals/Overlay';
import CreateMatchPost from '../Modals/CreateMatchPost';
import Modal from '../Modals/Modal';

const Feed: React.FC = () => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state: any) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ['match-posts'],
    queryFn: async () => {
      const response = await axios.get('/api/match-posts/');
      return response.data;
    },
    refetchOnWindowFocus: true,
  });

  const createPostMutation = useMutation({
    mutationFn: async ({ title, language }: any) => {
      console.log('title,lan', title, language);
      await axios.post('/api/match-posts/', {
        authorID: user.id,
        body: title,
        language: language,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['match-posts']);
      toast.success('Post created successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    },
  });

  const handleCreatePost = (body) => {
    createPostMutation.mutate(body);
    setIsOpen(false);
  };

  const renderedPosts = (
    <div className="overflow-auto max-h-screen">
      {data?.data?.posts.map((post) => {
        return <MatchPost key={post.id} post={post} />;
      })}
    </div>
  );

  return (
    <>
      {(!data || data.data.posts.length === 0) && (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-white text-xl">
            😢Nothing to show. Try again after some time...
          </p>
        </div>
      )}

      <div className="fixed bottom-4 right-12">
        <button
          className="bg-custom-light-green hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => setIsOpen(true)}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
        </button>
      </div>
      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)}>
        <Modal onClick={() => setIsOpen(false)}>
          <CreateMatchPost onSubmit={handleCreatePost}></CreateMatchPost>
        </Modal>
      </Overlay>
      <div className="flex flex-col ">{renderedPosts}</div>
    </>
  );
};

export default Feed;
