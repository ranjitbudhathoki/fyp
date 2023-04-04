import moment from 'moment';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

function HelpPost({ post }) {
  const { user } = useSelector((state: any) => state.auth);
  console.log('help post', post);

  const formattedDate = moment(post.updatedAt).fromNow();
  return (
    <>
      <div className="mt-2 mx-10 mb-16 max-w-screen-md rounded-2xl border p-4 text-white">
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
        </div>
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
        <div className="mt-7 ">
          <img src={post.image} className="h-45  w-full bg-cover"></img>
        </div>
      </div>
    </>
  );
}

export default HelpPost;
