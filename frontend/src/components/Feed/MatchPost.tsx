import moment from 'moment';
import { useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import CodeEditor from './CodeEditor';

function MatchPost({ post }) {
  const { user } = useSelector((state: any) => state.auth);

  const formattedDate = moment(post.updatedAt).fromNow();

  console.log(post);

  const [showModal, setShowModal] = useState(false);

  const handleSendSolutionClick = () => {
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="mt-2 mx-10 mb-16 max-w-screen-md rounded-2xl border p-4 bg-gray-900  ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src={post.user.photoUrl}
              alt={`${post.user.username}'s profile`}
              className="h-10 w-10 rounded-full bg-yellow-500 object-cover"
            />
            <div className="flex flex-col">
              <b className="mb-2 capitalize">{post.user.username}</b>
              <time dateTime="06-08-21" className="text-xs text-gray-400">
                {formattedDate}
              </time>
            </div>
          </div>
          <div className="flex h-3.5 items-center justify-center rounded-full bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="34px"
              fill="#92929D"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </div>
        </div>
        <div className="mt-7 whitespace-pre-wrap">{post.body}</div>
        <div className="mt-5 flex flex-wrap justify-center gap-2 border-b pb-4"></div>
        <div className="flex justify-center mt-2">
          <button
            onClick={toggleModal}
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Send Solution
          </button>
        </div>
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
        <div className="fixed inset-y-0 right-0 w-1/2 bg-black shadow-lg p-3 h-[650px] overflow-y-scroll">
          <form>
            <div className="px-4 py-5 m-0">
              <h2
                className="text-lg font-bold text-gray-200 text-center"
                id="modal-title"
              >
                Send Solution
              </h2>
            </div>
            <CodeEditor postId={post.id} userId={post.userId} />
            <div className="px-4 py-3 flex justify-center">
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
    </>
  );
}
export default MatchPost;
