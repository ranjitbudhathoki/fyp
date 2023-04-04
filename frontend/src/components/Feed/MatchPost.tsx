import moment from 'moment';
import { useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import CodeEditor from './CodeEditor';
import Overlay from '../../Modals/Overlay';
import SendSolutionModal from '../../Modals/SendSolutionModal';
import Modal from '../../Modals/Modal';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid';

function MatchPost({ post }) {
  const { user } = useSelector((state: any) => state.auth);

  console.log('match post', post);

  const formattedDate = moment(post.updatedAt).fromNow();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="mt-2 mx-10 mb-16 max-w-screen-md rounded-2xl border p-4 text-white ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src={post.user.photoUrl}
              alt={`${post.user.username}'s profile`}
              className="h-10 w-10 rounded-full bg-yellow-500 object-cover"
            />
            <div className="flex flex-col">
              <p className="mb-2 capitalize text-sm">{post.user.username}</p>
              <time dateTime="06-08-21" className="text-xs text-gray-400">
                {formattedDate}
              </time>
            </div>
          </div>
          <div className="bg-custom-light-green w-20 h-10 rounded-full flex items-center justify-center">
            <p className="text-sm fond-bold w-50 text-custom-light-dark">
              {post.language}
            </p>
          </div>
        </div>

        <div className="mt-7 whitespace-pre-wrap text-lg">{post.body}</div>
        <div className="mt-5 flex flex-wrap justify-center gap-2 border-b pb-4"></div>
        <div className="flex justify-center mt-2">
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="inline-flex justify-center  rounded-md border border-transparent shadow-sm px-4 py-2 bg-custom-light-green text-base w-12 font-medium text-black hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Send Solution
          </button>
        </div>
      </div>

      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)}>
        <Modal onClick={() => setIsOpen(false)}>
          <SendSolutionModal
            onSubmit={setIsOpen}
            postId={post.id}
            preferredGender={post.user.preferredGender}
            userId={post.userId}
            language={post.language}
          ></SendSolutionModal>
        </Modal>
      </Overlay>
    </>
  );
}
export default MatchPost;
