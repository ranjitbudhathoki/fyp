import React, { useState } from 'react';
import axios from '../utils/axios-instance';
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const Collaborator: React.FC = () => {
  const queryClient = useQueryClient();

  const { user } = useSelector((state: any) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState(
    [] as {
      name: string;
      description: string;
      link: string;
      techStack: string;
    }[]
  );

  const { data } = useQuery({
    queryKey: ['user-posts'],
    queryFn: async () => {
      const response = await axios.get('/api/posts');
      return response.data;
    },
  });

  console.log(data);

  const createPostMutation = useMutation({
    mutationFn: async (form: any) => {
      await axios.post('/api/posts/', {
        authorID: user.id,
        title: form.elements.name.value,
        body: form.elements.description.value,
        tech_stack: [form.elements.techStack.value],
        project_link: form.elements.link.value,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user-posts']);
    },
  });

  const handleCreatePost = async (event: any) => {
    event.preventDefault();

    const form = event.currentTarget;
    createPostMutation.mutate(form);

    const name = form.elements.name.value;
    const description = form.elements.description.value;
    const link = form.elements.link.value;
    const techStack = form.elements.techStack.value;

    setPosts([
      ...posts,
      {
        name,
        description,
        link,
        techStack,
      },
    ]);
    setShowModal(false);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const renderedPosts = data?.data?.posts.map((post, index) => (
    <div className="rounded-lg p-6 shadow-lg m-4 bg-gray-400">
      <div className="flex items-center mb-4">
        <img
          src={post.user.photoUrl}
          alt={post.user.username}
          className="w-10 h-10 rounded-full mr-2"
        />
        <div className="text-sm ">
          <p className="font-bold text-gray-900">{post.user.username}</p>
          <p className="text-gray-600">
            {new Date(post.updatedAt).toLocaleString()}.
          </p>
        </div>
      </div>
      <p className="text-gray-700 mb-4  font-bold">{post.title}</p>
      <p className="text-gray-700 ">Link: {post.project_link}</p>
      <br />

      <p className="text-gray-700">{post.body}</p>
    </div>
  ));

  return (
    <>
      <div className="flex align-center justify-center">
        <button
          onClick={toggleModal}
          className="bg-green-500 text-white rounded-md px-8 py-2 text-base font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 "
          id="open-btn"
        >
          Create Post
        </button>
      </div>
      <div className="flex flex-col ">
        <div
          className={`fixed top-0 left-0 bottom-0 right-0 z-50 ${
            showModal ? 'flex' : 'hidden'
          }`}
        >
          <div
            className="bg-gray-900 opacity-75 w-full h-full"
            onClick={() => setShowModal(false)}
          />
          <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <form
                onSubmit={handleCreatePost}
                className="px-10 py-10 text-black"
              >
                <div className="mb-2">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="name"
                  >
                    Project Name
                  </label>
                  <input
                    className="border border-gray-400 p-2 w-full"
                    id="name"
                    type="text"
                    name="name"
                  />
                </div>
                <div className="mb-2">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="description"
                  >
                    Project Description
                  </label>
                  <input
                    className="border border-gray-400 p-2 w-full"
                    id="description"
                    type="text"
                    name="description"
                  />
                </div>
                <div className="mb-2">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="link"
                  >
                    Project Link
                  </label>
                  <input
                    className="border border-gray-400 p-2 w-full"
                    id="link"
                    type="text"
                    name="link"
                  />
                </div>
                <div className="mb-2">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="techStack"
                  >
                    Technology Stack
                  </label>
                  <input
                    className="border border-gray-400 p-2 w-full"
                    id="techStack"
                    type="text"
                    name="techStack"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                    type="submit"
                  >
                    Submit
                  </button>
                  <button
                    onClick={toggleModal}
                    className="bg-red-500 text--500 py-2 px-4 rounded-lg hover:bg-red-600 text-white"
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-col overflow-y-auto h-[700px]">
          {renderedPosts}
        </div>
        <hr />
      </div>
    </>
  );
};

export default Collaborator;
