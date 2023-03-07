import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import axios from '../../utils/axios-instance';
import { TrashIcon } from '@heroicons/react/24/outline';

const Profile = () => {
  const { user } = useSelector((state: any) => state.auth);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['user-posts'],
    queryFn: async () => {
      const response = await axios.get(`/api/users/${user.id}/posts/`);
      return response.data;
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: any) => {
      console.log(id);
      await axios.delete(`/api/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user-posts']);
    },
  });

  const renderedPosts = data?.data?.posts.map((post, index) => {
    return (
      <div className="bg-neutral-400 m-4 p-5 text-black">
        <div className="w-11/12 pt-2">
          <div className="flex justify-between">
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
              <a
                href="#"
                className="text-grey mx-1 no-underline hover:underline"
              >
                {post.user.username}
              </a>
              <span className="text-grey">
                {new Date(post.updatedAt).toLocaleString()}
              </span>
            </div>
            <div className="">
              <TrashIcon
                className="h-10 w-10 bg-red-700 p-2"
                onClick={() => deletePostMutation.mutate(post.id)}
              />
            </div>
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
    <div>
      <div className="flex flex-col items-center p-6">
        <div className="flex flex-col items-center">
          <img
            src={user.photoUrl}
            alt={user.name}
            className="w-20 h-22 rounded-full object-cover mr-4"
          />
          <div className="flex flex-col text-center">
            <h1 className="text-lg font-bold text-white">{user.displayName}</h1>
            <p className="text-gray-600">@{user.username}</p>
            <p className="text-gray-600">{user.bio}</p>
          </div>
        </div>
        <button className="bg-blue-500 text-white font-bold py-2 px-4 mt-4 rounded">
          Update Profile
        </button>
      </div>

      <div className=" h-64 overflow-y-scroll">
        {renderedPosts?.length !== 0 ? (
          <div>
            <h1 className="text-lg font-medium mb-1 text-center mt-5">
              My Posts
            </h1>

            {renderedPosts}
          </div>
        ) : (
          <h1 className="text-white text-center">No post to show!</h1>
        )}
      </div>
    </div>
  );
};

export default Profile;
