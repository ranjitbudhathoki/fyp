import React, { useState } from "react";

const Collaborator: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState(
    [] as {
      name: string;
      description: string;
      link: string;
      techStack: string;
    }[]
  );

  const handleCreatePost = (event: any) => {
    event.preventDefault();

    const form = event.currentTarget;
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
      <div className="flex flex-col col-2">
        <div
          className={`fixed top-0 left-0 bottom-0 right-0 z-50 ${
            showModal ? "flex" : "hidden"
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
        <div className="flex flex-row row-span-2">
          {posts.map((post, index) => (
            <div className="flex flex-col align-center m-12 p-4 bg-gray-300 rounded-lg mt-2">
              <img
                src="https://avatars.githubusercontent.com/u/99970842?v=4"
                alt="ram"
                className="w-16 h-16 rounded-full"
              />
              <h2 className="text-lg font-bold mt-2">{post.name}</h2>
              <p className="text-gray-700">{post.description}</p>
              <a href={post.link} className="text-blue-500 underline">
                {post.link}
              </a>
              <p className="text-gray-700 mt-2">Tech Stack: {post.techStack}</p>
              <h3 className="text-sm font-medium mt-2 text-gray-700">
                by ranjit
              </h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Collaborator;
