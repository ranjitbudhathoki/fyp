import moment from 'moment';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import DeleteConfirmationModal from '../../Modals/DeleteConfirmationModal';
import Overlay from '../../Modals/Overlay';
import SendSolutionModal from '../../Modals/SendSolutionModal';
import Modal from '../../Modals/Modal';
import { TrashIcon } from '@heroicons/react/24/solid';

interface MatchPostProps {
  post: any;
  mutation?: any;
}

function MatchPost({ post, mutation }: MatchPostProps) {
  const { user } = useSelector((state: any) => state.auth);

  const formattedDate = moment(post.updatedAt).fromNow();
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const isOwner = post.user.id === user.id; // check if post owner is the current user

  return (
    <>
      <DeleteConfirmationModal
        isVisible={showConfirmationModal}
        message={`Do you want to delete this post ?`}
        onCancel={() => setShowConfirmationModal(false)}
        onConfirm={() => mutation.mutate(post.id)}
      />
      <div className="mt-2 mx-10 mb-16 max-w-screen-md rounded-2xl border p-4  bg-gray-300 text-black ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src={post.user.photoUrl}
              alt={`${post.user.username}'s profile`}
              className="h-10 w-10 rounded-full bg-yellow-500 object-cover"
            />
            <div className="flex flex-col">
              <p className="mb-2 capitalize text-sm">{post.user.username}</p>
              <time dateTime="06-08-21" className="text-xs text-black-400">
                {formattedDate}
              </time>
            </div>
          </div>
          <div className="bg-custom-light-green w-20 h-10 rounded-full flex items-center justify-center">
            <p className="text-sm fond-bold w-50 text-custom-light-dark">
              {post.language}
            </p>
          </div>
          {isOwner && (
            <div onClick={() => setShowConfirmationModal(true)}>
              <TrashIcon className="h-8  text-red-600" />
            </div>
          )}
        </div>

        <div className="mt-7 whitespace-pre-wrap text-lg">{post.body}</div>
        <div className="mt-5 flex flex-wrap justify-center gap-2 border-b pb-4"></div>
        {!isOwner && (
          <div className="flex justify-between items-center mt-2">
            <button
              onClick={() => setIsOpen(true)}
              type="button"
              className="inline-flex justify-center  rounded-md border border-transparent shadow-sm px-4 py-2 bg-custom-light-green text-base w-12 font-medium text-black hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Send Solution
            </button>
          </div>
        )}
      </div>

      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)}>
        <Modal onClick={() => setIsOpen(false)}>
          <SendSolutionModal
            onSubmit={setIsOpen}
            postId={post.id}
            postOwnerId={post.user.id}
            preferredGender={post.user.preferredGender}
            userId={user.id}
            language={post.language}
          ></SendSolutionModal>
        </Modal>
      </Overlay>
    </>
  );
}

export default MatchPost;
