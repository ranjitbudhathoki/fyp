import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import axios from '../utils/axios-instance';
import { TrashIcon } from '@heroicons/react/24/outline';

const Profile = () => {
  const { user } = useSelector((state: any) => state.auth);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['user-posts'],
    queryFn: async () => {
      const response = await axios.get(`/api/users/${user.id}/posts/`);
      return response.data;
    },
  });

  const posts = data?.data?.posts;

  const deletePostMutation = useMutation({
    mutationFn: async (id: any) => {
      console.log(id);
      await axios.delete(`/api/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user-posts']);
    },
  });

  const renderedPosts = posts?.map((post) => {
    return (
      <div className="bg-black h-full">
        <div>{post.title}</div>
      </div>
    );
  });

  console.log('rendered posts', renderedPosts);
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
