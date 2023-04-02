// import React, { useState, useMemo, useRef, useEffect } from 'react';
// import TinderCard from 'react-tinder-card';
// import { FcLike } from 'react-icons/fc/';
// import { useQueryClient, useQuery, useMutation } from 'react-query';
// import axios from '../utils/axios-instance';
// import { useSelector } from 'react-redux';

// function Date() {
//   console.log('date');

//   // const queryClient = useQueryClient();

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [lastDirection, setLastDirection] = useState();
//   const [solution, setSolution] = useState();
//   // const [loveSelected, setLoveSelected] = useState(true);
//   // const [friendshipSelected, setFriendshipSelected] = useState(false);
//   const { user } = useSelector((state: any) => state.auth);

//   const { data: posts, isLoading: loadingPost } = useQuery({
//     queryKey: ['posts'],
//     queryFn: async () => {
//       const response = await axios.get(`/api/match-posts/user/${user.id}`);
//       console.log(response);
//       return response.data;
//     },
//   });

//   const post = posts?.data?.post;

//   const { data: solutions, isLoading } = useQuery({
//     queryKey: ['solutions'],
//     queryFn: async function () {
//       const res = await axios.get(`/api/solutions/${posts?.data?.post.id}`);
//       setSolution(res.data);
//       return res.data;
//     },
//     enabled: !!post,
//   });

//   const matchMutation = useMutation({
//     mutationKey: ['match'],
//     mutationFn: async (userid) => {
//       const res = await axios.post('/match', { userid });
//     },
//   });
//   console.log(solutions);

//   console.log('soln', solutions);
//   // used for outOfFrame closure
//   const currentIndexRef: any = useRef(currentIndex);

//   const childRefs: any = useMemo(
//     () =>
//       Array(solutions?.length)
//         .fill(0)
//         .map((i) => React.createRef()),
//     []
//   );
//   // if (loadingPost) {
//   //   return <div>loading...</div>;
//   // }

//   // console.log('from solutions', solutions[0]);
//   if (isLoading) {
//     return <h1>Loadiing solutions</h1>;
//   }

//   const updateCurrentIndex = (val) => {
//     setCurrentIndex(val);
//     currentIndexRef.current = val;
//   };

//   // const canGoBack = currentIndex < db.length - 1;

//   const canSwipe = currentIndex >= 0;

//   // set last direction and decrease current index
//   const swiped = (direction, nameToDelete, index) => {
//     console.log(direction);
//     setLastDirection(direction);
//     updateCurrentIndex(index - 1);
//   };

//   const outOfFrame = (name, idx) => {
//     console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
//     // handle the case in which go back is pressed before card goes outOfFrame
//     currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
//     // TODO: when quickly swipe and restore multiple times the same card,
//     // it happens multiple outOfFrame events are queued and the card disappear
//     // during latest swipes. Only the last outOfFrame event should be considered valid
//   };

//   const swipe = async (dir) => {
//     if (canSwipe && currentIndex < solutions?.length) {
//       await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
//     }

//     if (dir == 'right') {
//       matchMutation.mutate(solutions[0].user.id);
//     }
//   };

//   return (
//     <div className="">
//       <div className="flex flex-col justify-center  items-center h-full mt-0">
//         <div className="cardContainer">
//           {loadingPost && <div>Loading posts</div>}
//           {solutions?.map((soln: any, index: any) => (
//             <TinderCard
//               ref={childRefs[index]}
//               className="swipe"
//               key={soln.id}
//               flickOnSwipe={true}
//               onSwipe={(dir) => swiped(dir, soln.name, index)}
//               onCardLeftScreen={() => outOfFrame(soln.name, index)}
//             >
//               <div className="">
//                 <img
//                   src={`http://localhost:8000/images/${soln.imgUrl}`}
//                   alt="solutions"
//                   // className="h-[360px] w-[400px]"
//                   className="object-fill h-96 w-90"
//                 />
//               </div>
//             </TinderCard>
//           ))}
//         </div>
//         <div className="buttons">
//           <button
//             style={{ backgroundColor: !canSwipe && '#c3c4d3' }}
//             onClick={() => swipe('left')}
//           >
//             Dislike👎
//           </button>

//           <button
//             style={{ backgroundColor: !canSwipe && '#c3c4d3' }}
//             onClick={() => swipe('right')}
//           >
//             Like💕
//           </button>
//         </div>
//         {lastDirection ? (
//           <h2 key={lastDirection} className="infoText">
//             You swiped {lastDirection}
//           </h2>
//         ) : (
//           <h2 className="infoText">Swipe a card or press a button!</h2>
//         )}
//       </div>
//       {/* <div className="flex  top-20 absolute right-0 m-0">
//         <button
//           className={`text-white font-bold py-2 px-4 rounded-full ${
//             loveSelected ? 'bg-red-500' : 'bg-gray-500'
//           }`}
//           onClick={() => {
//             setLoveSelected(true);
//             setFriendshipSelected(false);
//           }}
//         >
//           Love
//         </button>
//         <button
//           className={`text-white font-bold py-2 px-4 rounded-full ml-4 ${
//             friendshipSelected ? 'bg-blue-500' : 'bg-gray-500'
//           }`}
//           onClick={() => {
//             setLoveSelected(false);
//             setFriendshipSelected(true);
//           }}
//         >
//           Friendship
//         </button>
//       </div> */}
//     </div>
//   );
// }
// export default Date;

import { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import TinderCard from 'react-tinder-card';
import axios from '../utils/axios-instance';
import { toast } from 'react-toastify';

function Date() {
  const [lastDirection, setLastDirection] = useState();

  const [topics, setTopics] = useState([]);

  const { user } = useSelector((state: any) => state.auth);

  const { data: posts, isLoading: loadingPost } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await axios.get(`/api/match-posts/user/${user.id}`);
      return response.data;
    },
  });

  const post = posts?.data?.post;

  useEffect(() => {
    setTopics(post?.body);
  }, [posts]);

  console.log(topics);

  const { data: solutions, isLoading } = useQuery({
    queryKey: ['solutions'],
    queryFn: async function () {
      const res = await axios.get(`/api/solutions/${posts?.data?.post.id}`);
      return res.data;
    },
    enabled: !!post,
  });

  const [currentIndex, setIndex] = useState(0);

  console.log(currentIndex);

  const matchMutation = useMutation({
    mutationKey: ['match'],
    mutationFn: async (swipedUser: any) => {
      const res = await axios
        .post('/api/match', { matchedUserId: swipedUser.id })
        .then(() => {
          toast.success(`You have a match with ${swipedUser.username}`);
        })
        .catch((e) => toast.error(e.message));
    },
  });

  console.log(solutions);

  const swiped = (direction, swipedUser) => {
    if (direction === 'right') {
      // console.log('matched user', matchedUserId);
      matchMutation.mutate(swipedUser);
    } else if (direction === 'left') {
      setIndex(currentIndex + 1);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
  };

  return (
    <div className="dashboard">
      <div className="swipe-container">
        <div className="card-container">
          {solutions?.map((soln: any) => (
            <TinderCard
              className="swipe"
              key={soln.id}
              onSwipe={(dir) => swiped(dir, soln.user)}
              preventSwipe={['up', 'down']}
              onCardLeftScreen={() => outOfFrame(soln.id)}
            >
              <div
                className="relative"
                style={{
                  backgroundImage:
                    'url(' +
                    `http://localhost:8000/images/${soln.imgUrl}` +
                    ')',

                  backgroundSize: 'contain',
                  marginTop: '0',
                  width: '700px',
                  height: '500px',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
              <div className="absolute bottom-10">
                <img className="h-10 w-10 rounded-full" src={user?.photoUrl} />
              </div>
            </TinderCard>
          ))}
          <div className="swipe-info">
            {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Date;
