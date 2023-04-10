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
import { Link } from 'react-router-dom';

enum Tab {
  MATCH_POSTS = 'MATCH_POSTS',
  HELP_POSTS = 'HELP_POSTS',
}

const TabbedButton = ({ children, selectedTab, tabType, setSelectedTab }) => {
  const isActive =
    selectedTab === tabType ? 'text-custom-light-green' : 'text-gray-400';
  return (
    <li className="mr-2 text-sm" onClick={() => setSelectedTab(tabType)}>
      <button
        className={`p-4  ${isActive} bg-custom-light-dark rounded-t-lg active dark:bg-gray-800 dark:text-blue-500`}
      >
        {children}
      </button>
    </li>
  );
};

const Profile = () => {
  const { user } = useSelector((state: any) => state.auth);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.MATCH_POSTS);

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
        <MatchPost post={post} mutation={deleteMatchPostMutation} />
      </div>
    );
  });
  const renderedHelpPosts = helpost?.map((post) => {
    return <HelpPost post={post} />;
  });

  const handleUpdateProfile = (body) => {
    updateProfileMutation.mutate(body);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col">
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
      <div className="flex flex-row">
        <TabbedButton
          tabType={Tab.MATCH_POSTS}
          selectedTab={selectedTab}
          setSelectedTab={() => {
            setSelectedTab(Tab.MATCH_POSTS);
          }}
        >
          Match Posts
        </TabbedButton>
        <TabbedButton
          tabType={Tab.HELP_POSTS}
          selectedTab={selectedTab}
          setSelectedTab={() => {
            setSelectedTab(Tab.HELP_POSTS);
          }}
        >
          Help Posts
        </TabbedButton>
      </div>

      <div className="h-full w-full pb-6 md:w-2/3 p-6 overflow-y-auto ">
        {selectedTab === Tab.MATCH_POSTS &&
          (renderedMatchPosts?.length > 0 ? (
            renderedMatchPosts
          ) : (
            <div className="flex items-center justify-center mt-40 h-full text-gray-400">
              <span className="text-3xl mr-2">🤔</span>
              <span>No match posts found</span>
            </div>
          ))}
        {selectedTab === Tab.HELP_POSTS &&
          (renderedHelpPosts?.length > 0 ? (
            renderedHelpPosts
          ) : (
            <div className="flex items-center justify-center mt-40 h-full text-gray-400">
              <span className="text-3xl mr-2">🙁</span>
              <span>No help posts found</span>
            </div>
          ))}
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
