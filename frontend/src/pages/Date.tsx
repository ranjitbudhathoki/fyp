import { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation, QueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import TinderCard from 'react-tinder-card';
import axios from '../utils/axios-instance';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';

function Date() {
  const [lastDirection, setLastDirection] = useState();

  const { user } = useSelector((state: any) => state.auth);
  const [currentUser, setCurrentUser] = useState();
  const [currentSolution, setCurrentSolution] = useState();

  const queryClient = new QueryClient();

  const { data: posts, isLoading: loadingPost } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await axios.get(`/api/match-posts/user/${user.id}`);
      return response.data;
    },
  });

  const post = posts?.data?.post;

  const { data: solutions, isLoading } = useQuery({
    queryKey: ['solutions'],
    queryFn: async function () {
      const res = await axios.get(`/api/solutions/${posts?.data?.post.id}`);
      return res.data;
    },
    enabled: !!post,
    refetchOnWindowFocus: true,
  });

  const matchMutation = useMutation({
    mutationKey: ['match'],
    mutationFn: async ({ swipedUser, swipedSoln }: any) => {
      await axios.post('/api/matches', {
        matchedUserId: swipedUser,
        solutionId: swipedSoln,
      });
    },
    onSuccess: () => {
      toast.success(`Matched `);
      queryClient.invalidateQueries('solutions');
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const deleteSolutionMutation = useMutation({
    mutationKey: ['deleteSolution'],
    mutationFn: async (solutionId: any) => {
      await axios.delete(`/api/solutions/${solutionId}`);
    },
    onSuccess: () => {
      toast(`Solution rejected`);
      queryClient.invalidateQueries('solutions');
    },
    onError: (error: any) => {
      console.log('from delete mutation', error.response.data.message);
      toast.error(error.response.data.message);
    },
  });

  console.log('from solutions', solutions?.data);

  const swiped = (direction, swipedUser, swipedSoln) => {
    console.log('from swiped', currentSolution);
    if (direction === 'right') {
      console.log('inside right swipe');
      matchMutation.mutate({ swipedUser, swipedSoln });
    }
    if (direction === 'left') {
      deleteSolutionMutation.mutate(swipedSoln);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
  };

  return (
    <div className="dashboard mt-0">
      <div className="swipe-container">
        {!solutions && (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-white text-xl">
              😢Nothing to show. Wait until someone sends you solution...
            </p>
          </div>
        )}
        {solutions?.data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-white text-xl">
              😢Nothing to show. Wait until someone sends you solution...
            </p>
          </div>
        ) : (
          <p className="text-white text-lg text-center pl-20 mb-2">
            Swipe right to 💕Like a profile, left to 👎dislike the profile
          </p>
        )}
        <div className="card-container">
          {solutions?.data?.map((soln: any) => (
            <TinderCard
              className="swipe"
              key={soln.id}
              onSwipe={(dir) => {
                setCurrentSolution(soln);
                swiped(dir, soln?.user?.id, soln.id);
              }}
              preventSwipe={['up', 'down']}
              onCardLeftScreen={() => outOfFrame(soln.id)}
            >
              <div
                className="relative w-full h-full bg-cover "
                style={{
                  backgroundImage: 'url(' + `${soln.imgUrl}` + ')',
                  backgroundSize: 'contain',

                  width: '900px',
                  height: '440px',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
              <div className="absolute bottom-0 flex flex-row p-2">
                <img
                  className="h-10 w-10 rounded-full"
                  src={soln?.user?.photoUrl}
                />
                <div className="flex flex-col ml-4">
                  <p className="text-sm"> {soln?.user?.username}</p>
                  <p className="text-sm"> {soln?.user?.bio}</p>
                </div>
              </div>
            </TinderCard>
          ))}
          <div className="swipe-info text-white text-center">
            {solutions?.data?.length > 0 && lastDirection && (
              <p className="text-lg">You swiped {lastDirection}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Date;
