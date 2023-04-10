import { useEffect, useState } from 'react';
import axios from '../utils/axios-instance';
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import HelpPost from '../components/collaborator/HelpPost';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Overlay from '../Modals/Overlay';
import Modal from '../Modals/Modal';
import CreateHelpPost from '../Modals/CreateHelpPost';

const Collaborator: React.FC = () => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state: any) => state.auth);

  const [isOpen, setIsOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ['help-posts'],
    queryFn: async () => {
      const response = await axios.get('/api/help-posts/');
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 5,
  });

  const createPostMutation = useMutation({
    mutationFn: async (data) => {
      console.log('mutation data', data);
      await axios.post('/api/help-posts/', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['help-posts']);
      toast.success('post created');
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = async (data: any) => {
    createPostMutation.mutate(data);
    setIsOpen(false);
  };

  const renderedPosts = (
    <div className="max-w-full h-screen ">
      {data?.data?.posts.map((post) => {
        return <HelpPost post={post} key={post.id} />;
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
          <CreateHelpPost onSubmit={handleSubmit}></CreateHelpPost>
        </Modal>
      </Overlay>
      <div className="max-w-full h-screen mt-0 ">{renderedPosts}</div>
    </>
  );
};

export default Collaborator;
