import React, { useState } from 'react';
import axios from '../utils/axios-instance';
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import MatchPost from '../components/Feed/MatchPost';
import { toast } from 'react-toastify';

const Feed: React.FC = () => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state: any) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [body, setBody] = useState('');

  const { data } = useQuery({
    queryKey: ['match-posts'],
    queryFn: async () => {
      const response = await axios.get('/api/match-posts/');
      return response.data;
    },
    refetchOnWindowFocus: true,
  });

  const createPostMutation = useMutation({
    mutationFn: async (description: any) => {
      await axios.post('/api/match-posts/', {
        authorID: user.id,
        body: description,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['match-posts']);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    },
  });

  const handleCreatePost = async (event: any) => {
    event.preventDefault();
    createPostMutation.mutate(body);
    setShowModal(false);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
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
      <div className="fixed bottom-4 right-12">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={toggleModal}
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

      <div
        className={`fixed top-0 left-0 bottom-0 right-0 z-50 ${
          showModal ? 'flex' : 'hidden'
        }`}
      >
        <div
          className="bg-gray-900 opacity-75 w-full h-full"
          onClick={() => setShowModal(false)}
        />
        <div className="fixed inset-y-0 right-0 w-1/3 bg-black shadow-lg p-3 h-[650px] overflow-y-scroll">
          <form onSubmit={handleCreatePost}>
            <div className="px-4 py-5 m-0">
              <h2
                className="text-lg font-bold text-gray-200 text-center"
                id="modal-title"
              >
                Create a new post
              </h2>

              <div className="mt-4">
                <label
                  htmlFor="problem_description"
                  className="blocktext-sm font-medium text-gray-400"
                >
                  Problem Description
                </label>
                <div className="mt-1">
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    name="problem_description"
                    id="problem_description"
                    rows={8}
                    className="p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm bg-gray-700 border-gray-600 rounded-md text-gray-200"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 flex justify-center">
              <button
                type="submit"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Submit
              </button>
              <button
                onClick={() => setShowModal(false)}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* </div> */}
      <div className="flex flex-col ">{renderedPosts}</div>
    </>
  );
};

export default Feed;
