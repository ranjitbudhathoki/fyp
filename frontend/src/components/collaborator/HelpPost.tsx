import moment from 'moment';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

function HelpPost({ post }) {
  const { user } = useSelector((state: any) => state.auth);

  const formattedDate = moment(post.updatedAt).fromNow();
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
      </div>
    </>
  );
}

export default HelpPost;
