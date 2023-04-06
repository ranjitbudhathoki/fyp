import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../utils/axios-instance';
import HelpPost from '../components/collaborator/HelpPost';
import MatchPost from '../components/Feed/MatchPost';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import Overlay from '../Modals/Overlay';
import Modal from '../Modals/Modal';
import UpdateProfileModal from '../Modals/UpdateProfileModal';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useSelector((state: any) => state.auth);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const { data: helpPosts, isLoading } = useQuery({
    queryKey: ['user-help-posts'],
    queryFn: async () => {
      const response = await axios.get(`/api/users/${user.id}/help-posts/`);
      return response.data;
    },
  });

  const helpost = helpPosts?.data?.posts;

  const { data: matchPosts, isLoading: isMatchPostLoading } = useQuery({
    queryKey: ['user-match-posts'],
    queryFn: async () => {
      const response = await axios.get(`/api/users/${user.id}/match-posts/`);
      return response.data;
    },
  });

  const matchpost = matchPosts?.data?.posts;

  const deleteMatchPostMutation = useMutation({
    mutationFn: async (id: any) => {
      console.log(id);
      await axios.delete(`/api/match-posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user-match-posts']);
    },
  });

  const deleteHelpPostMutation = useMutation({
    mutationFn: async (id: any) => {
      console.log(id);
      await axios.delete(`/api/help-posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user-help-posts']);
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.patch(`/api/users/${user.id}`, data);
    },
    onSuccess: (value) => {
      toast.success('Profile Updated Successfully');
      queryClient.invalidateQueries(['user-data']);
    },
    onError: () => {
      toast.error('Error Updating Profile');
    },
  });

  const renderedMatchPosts = matchpost?.map((post) => {
    return (
      <div key={post.id} className="max-w-full h-screen m-0">
        <MatchPost post={post} mutation={deleteMatchPostMutation} />;
      </div>
    );
  });
  const renderedHelpPosts = helpost?.map((post) => {
    return (
      <div key={post.id} className="max-w-full h-screen m-0">
        <HelpPost post={post} mutation={deleteHelpPostMutation} />;
      </div>
    );
  });

  const handleUpdateProfile = (body) => {
    updateProfileMutation.mutate(body);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/3 p-6 fixed right-0">
        <div className="bg-white rounded-md shadow-md p-6">
          <div className="flex  flex-col items-center mb-6">
            <img
              src={user.photoUrl}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover mr-4"
            />
            <div className="flex flex-col text-center">
              <h1 className="text-lg font-bold text-gray-900">
                {user.displayName}
              </h1>
              <p className="text-gray-600 text-sm">@{user.username}</p>
              <p className="text-gray-600 text-sm">{user.bio}</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-custom-light-green text-white  text-lg font-bold py-2 px-4 rounded w-full"
          >
            Update Profile
          </button>
        </div>
      </div>
      <div className="md:w-2/3 p-6 overflow-y-auto">
        <h1 className="text-custom-light-green text-center underline mb-10">
          My Posts
        </h1>
        <h4 className="text-white text-center mb-3 text-2xl underline">
          Match Posts
        </h4>
        {renderedMatchPosts?.length !== 0 ? (
          renderedMatchPosts
        ) : (
          <div className="flex items-center justify-center p-4  mb-30">
            <InformationCircleIcon className="w-8 h-8 text-gray-400 mr-2" />
            <div>
              <h2 className="text-lg font-medium text-white mb-30">
                Such empty here. No any post.
              </h2>
            </div>
          </div>
        )}
        <h4 className="text-white text-center mb-3 text-2xl underline  mt-50">
          Help Posts
        </h4>

        {renderedHelpPosts?.length !== 0 ? (
          renderedHelpPosts
        ) : (
          <div className="flex items-center justify-center p-4  mb-30">
            <InformationCircleIcon className="w-8 h-8 text-gray-400 mr-2" />
            <div>
              <h2 className="text-lg font-medium text-white mb-30">
                Such empty here. No any post.
              </h2>
            </div>
          </div>
        )}
      </div>
      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)}>
        <Modal onClick={() => setIsOpen(false)}>
          <UpdateProfileModal
            onUpdate={handleUpdateProfile}
          ></UpdateProfileModal>
        </Modal>
      </Overlay>
    </div>
  );
};

export default Profile;
