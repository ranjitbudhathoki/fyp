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
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await axios.get('/api/posts');
      return response.data;
    },
  });

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
      queryClient.invalidateQueries(['posts']);
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

  const renderedPosts = data?.data?.posts.map((post, index) => {
    return (
      <div className="bg-neutral-400 m-4 p-5 text-black">
        <div className="w-11/12 pt-2">
          <div className="flex items-center text-xs mb-2">
            <a
              href="#"
              className="font-semibold no-underline hover:underline text-black flex items-center"
            >
              <img
                className="rounded-full border h-7 w-7"
                src={post.user.photoUrl}
              />
            </a>
            <span className="text-grey-light mx-1 text-xxs">•</span>
            <span className="text-grey">Posted by</span>
            <div className="flex flex-col"></div>
            <a href="#" className="text-grey mx-1 no-underline hover:underline">
              {post.user.username}
            </a>
            <span className="text-grey">
              {new Date(post.updatedAt).toLocaleString()}
            </span>
          </div>
          <div className="text-black">
            <h1 className="text-lg font-medium mb-1 text-black ">
              {post.title}
            </h1>
            <h2 className="text-md font-medium mb-1 text-black ">
              {post.body}
            </h2>
            <a
              href={post.project_link}
              className="text-indigo-600 hover:text-indigo-500"
            >
              Link
            </a>
          </div>
          <div className="inline-flex items-center my-1">
            <div className="flex hover:bg-grey-lighter p-1">
              <svg
                className="w-4 fill-current text-grey"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-4 4v-4H2a2 2 0 0 1-2-2V3c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8zM5 7v2h2V7H5zm4 0v2h2V7H9zm4 0v2h2V7h-2z"></path>
              </svg>
              <span className="ml-2 text-xs font-semibold text-grey">
                3k Comments
              </span>
            </div>
            <div className="flex hover:bg-grey-lighter p-1 ml-2">
              <svg
                className="w-4 fill-current text-grey"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5.08 12.16A2.99 2.99 0 0 1 0 10a3 3 0 0 1 5.08-2.16l8.94-4.47a3 3 0 1 1 .9 1.79L5.98 9.63a3.03 3.03 0 0 1 0 .74l8.94 4.47A2.99 2.99 0 0 1 20 17a3 3 0 1 1-5.98-.37l-8.94-4.47z"></path>
              </svg>
              <span className="ml-2 text-xs font-semibold text-grey">
                Share
              </span>
            </div>
            <div className="flex hover:bg-grey-lighter p-1 ml-2">
              <svg
                className="w-4 fill-current text-grey"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M0 2C0 .9.9 0 2 0h14l4 4v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5 0v6h10V2H5zm6 1h3v4h-3V3z"></path>
              </svg>
              <span className="ml-2 text-xs font-semibold text-grey">Save</span>
            </div>
            <div className="flex hover:bg-grey-lighter p-1 ml-2 rotate-90">
              <svg
                className="w-4 fill-current text-grey"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  });

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
