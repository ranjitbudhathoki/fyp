import moment from 'moment';
import { useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import DeleteConfirmationModal from '../../Modals/DeleteConfirmationModal';
import { TrashIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

interface HelpPostProps {
  post: any;
  mutation?: any;
}

function HelpPost({ post, mutation }: HelpPostProps) {
  const { user } = useSelector((state: any) => state.auth);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);

  const isOwner = post.user.id === user.id; // check if post owner is the current user

  const formattedDate = moment(post.updatedAt).fromNow();

  const handleConfirm = () => {
    mutation.mutate(post.id);
    setShowConfirmationModal(false);
  };

  console.log('post', post);

  return (
    <>
      <DeleteConfirmationModal
        isVisible={showConfirmationModal}
        message={`Do you want to delete this post ?`}
        onCancel={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirm}
      />
      <div className=" mx-10 mb-16 max-w-screen-md rounded-2xl border p-4 bg-gray-300 text-black">
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

          {isOwner && (
            <div
              className="flex justify-end"
              onClick={() => setShowConfirmationModal(true)}
            >
              <TrashIcon className="h-8 w-8 text-red-600 cursor-pointer" />
            </div>
          )}
        </div>

        <>
          <Link to={`/collaborator/posts/${post.id}`}>
            <div className="flex flex-row mt-2">
              {post?.tech_stack?.map((tech) => (
                <div
                  key={tech}
                  className="bg-custom-light-green w-20 h-10 rounded-full flex flex-row items-center justify-center mr-2"
                >
                  <p className="text-sm fond-bold w-50 text-custom-light-dark">
                    {tech}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 whitespace-pre-wrap text-xl">{post.title}</div>
            <div className="mt-7 whitespace-pre-wrap text-sm">{post.body}</div>
            {post.project_link && (
              <div className="mt-7 whitespace-pre-wrap text-sm text-blue-600 underline">
                <a
                  href={`https://${post.project_link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LINK
                </a>
              </div>
            )}

            {post.image && (
              <div className="mt-7 ">
                <img
                  src={post.image}
                  className="h-45 w-full bg-cover"
                  alt="post"
                />
              </div>
            )}
          </Link>
        </>
      </div>
    </>
  );
}

export default HelpPost;
