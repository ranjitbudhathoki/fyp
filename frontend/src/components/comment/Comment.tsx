// import { useState } from 'react';
// import {
//   PencilSquareIcon,
//   TrashIcon,
//   HeartIcon as OutlineHeartIcon,
//   ArrowUturnRightIcon,
// } from '@heroicons/react/24/outline';
// import { HeartIcon } from '@heroicons/react/24/solid';
// import { formatDistance, formatRelative } from 'date-fns';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import axios from '../../utils/axios-instance';
// import { useSelector } from 'react-redux';
// import CommentForm from './CommentForn';
// import { CommentList } from './CommentList';
// // import CommentButton from './CommentButton';

// function Comment({
//   todo,
//   contents,
//   user,
//   createdAt,
//   updatedAt,
//   getReplies,
//   id: commentId,
//   todoId,
// }: any) {
//   const queryClient = useQueryClient();
//   const {
//     user: { id },
//   } = useSelector((state: any) => state.auth);
//   const [isEditing, setIsEditing] = useState<boolean>(false);
//   const [isReplying, setIsReplying] = useState<boolean>(false);
//   const [areChildrenHidden, setAreChildrenHidden] = useState<boolean>(true);
//   const childComments = getReplies(commentId);

//   const likedQuery = useQuery(['like-query', commentId], async () => {
//     const res = await axios.get(
//       `/todo/${id}/${commentId}/comments/get-like-count`
//     );
//     return res?.data;
//   });

//   const likedQueryData = likedQuery?.data?.data;

//   const timeFormatter = (createdAt: Date, updatedAt: Date) => {
//     const isEqual =
//       new Date(createdAt).getTime() === new Date(updatedAt).getTime();
//     if (!isEqual) {
//       return 'updated ' + formatRelative(new Date(updatedAt), new Date());
//     }
//     return 'created ' + formatRelative(new Date(createdAt), new Date());
//   };

//   const commentUpdateMutation = useMutation(
//     async (data: any) => {
//       const res = await axios.post(
//         `/todo/${todoId}/${id}/comments/${commentId}`,
//         data
//       );
//       return res.data;
//     },
//     {
//       onError: (error) => {
//         console.log('error', error);
//       },
//       onSuccess: (data) => {
//         queryClient.invalidateQueries(['todo-query', todo.todoCardId]);
//         queryClient.invalidateQueries(['single-todo'], todoId);
//       },
//     }
//   );

//   const commentReplyMutation = useMutation(
//     async (payload: any) => {
//       console.log('payload', payload);
//       const res = await axios.post(`/todo/${todoId}/${id}/comments`, {
//         ...payload,
//         parentId: commentId,
//       });
//       return res.data;
//     },
//     {
//       onError: (error) => {
//         console.log('error', error);
//       },
//       onSuccess: (data) => {
//         queryClient.invalidateQueries(['todo-query', todo.todoCardId]);
//         queryClient.invalidateQueries(['single-todo'], todoId);
//       },
//     }
//   );

//   const commentDeleteMutation = useMutation(
//     async () => {
//       const res = await axios.delete(
//         `/todo/${todoId}/${id}/comments/${commentId}`
//       );
//       return res.data;
//     },
//     {
//       onError: (error) => {
//         console.log('error', error);
//       },
//       onSuccess: (data) => {
//         queryClient.invalidateQueries(['todo-query', todo.todoCardId]);
//         queryClient.invalidateQueries(['single-todo'], todoId);
//       },
//     }
//   );

//   const toggleLikeMutation = useMutation(
//     async () => {
//       const res = await axios.post(
//         `/todo/${id}/${commentId}/comment/toggle-like`
//       );
//       return res.data;
//     },
//     {
//       onError: (error) => {
//         console.log('error', error);
//       },
//       onSuccess: (data) => {
//         queryClient.invalidateQueries(['todo-query', todo.todoCardId]);
//         queryClient.invalidateQueries(['like-query'], commentId);
//       },
//     }
//   );
//   const commentReplySubmit = (data: any) => {
//     commentReplyMutation.mutate(data);
//   };

//   const commentUpdateSubmit = (data: any) => {
//     commentUpdateMutation.mutate(data);
//   };

//   const commentDeleteSubmit = () => {
//     commentDeleteMutation.mutate();
//   };

//   const commentLikeToggleSubmit = () => {
//     toggleLikeMutation.mutate();
//   };

//   const timeFormat = timeFormatter(createdAt, updatedAt);

//   return (
//     <>
//       <div className="m-2 ">
//         <div className="flex gap-2">
//           <div className="relative flex items-center rounded-full">
//             <img
//               className="w-10 h-10 cursor-pointer rounded-full"
//               src={user?.photo}
//               alt="User Profile"
//               referrerPolicy="no-referrer"
//             />{' '}
//           </div>
//           <div className="flex flex-col gap-1 w-full rounded-md ">
//             <div className="flex flex-col gap-1 p-2 rounded-md bg-custom-light-dark ">
//               <h2 className="text-custom-light-green text-xs">
//                 {user?.userName}
//               </h2>
//               <p className="text-gray-300">{contents}</p>
//             </div>
//             <div className="flex items-center gap-3">
//               <CommentButton
//                 onClick={commentLikeToggleSubmit}
//                 Icon={likedQueryData?.likedByMe ? HeartIcon : OutlineHeartIcon}
//                 activeClass={
//                   likedQueryData?.likedByMe ? 'text-custom-light-green' : ''
//                 }
//               >
//                 {likedQueryData?.totalLikes}
//                 {likedQueryData?.totalLikes < 2 ? ' Like' : ' Likes'}
//               </CommentButton>
//               <CommentButton
//                 onClick={() => {
//                   setIsEditing(false);
//                   setIsReplying(!isReplying);
//                 }}
//                 activeClass={isReplying ? 'text-custom-light-green' : ''}
//                 Icon={ArrowUturnRightIcon}
//               >
//                 Reply
//               </CommentButton>
//               {id === user.id ? (
//                 <>
//                   <CommentButton
//                     activeClass={isEditing ? 'text-custom-light-green' : ''}
//                     onClick={() => {
//                       setIsReplying(false);
//                       setIsEditing(!isEditing);
//                     }}
//                     Icon={PencilSquareIcon}
//                   >
//                     Edit
//                   </CommentButton>
//                   <CommentButton
//                     onClick={commentDeleteSubmit}
//                     Icon={TrashIcon}
//                     color="text-red-500"
//                   >
//                     Delete
//                   </CommentButton>
//                 </>
//               ) : null}
//               <span className="text-gray-200 text-xs opacity-40  hover:opacity-100 cursor-pointer">
//                 {timeFormat}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {isEditing && (
//         <CommentForm
//           autoFocus
//           onSubmit={commentUpdateSubmit}
//           initialValue={contents}
//         />
//       )}

//       {childComments?.length > 0 && (
//         <>
//           <div
//             className={`nested-comments-stack ${
//               areChildrenHidden ? 'hide' : ''
//             }`}
//           >
//             <button
//               className="collapse-line"
//               aria-label="Hide Replies"
//               onClick={() => setAreChildrenHidden(true)}
//             />
//             <div className="nested-comments">
//               <CommentList
//                 todo={todo}
//                 todoId={todoId}
//                 getReplies={getReplies}
//                 comments={childComments || []}
//               />
//             </div>
//           </div>
//           <button
//             className={`btn mt-1 ${!areChildrenHidden ? 'hide' : ''}`}
//             onClick={() => setAreChildrenHidden(false)}
//           >
//             Show Replies
//           </button>
//         </>
//       )}
//       {isReplying && (
//         <div className="mt-2 ml-3">
//           <CommentForm autoFocus onSubmit={commentReplySubmit} />
//         </div>
//       )}
//     </>
//   );
// }
// export default Comment;

import { CommentList } from './CommentList';
import { useState } from 'react';
import { CommentForm } from './CommentForm';
import IconBtn from '../IconBtn';
import { HeartIcon } from '@heroicons/react/24/solid';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

function Comment({
  id: commentId,
  comment,
  createdAt,
  likeCount,
  getReplies,
  productId,
  likedByMe,
  user: commentedUser,
  userId: commentedUserId,
}) {
  const queryClient = useQueryClient();
  const {
    user: { id },
  } = useSelector((state: any) => state.auth);

  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const childComments = getReplies(commentId);

  const upvoteQuery = useQuery(['like-query', commentId], async () => {
    const res = await axios.get(
      `http://localhost:8000/products/get-product-comment-like/${id}/${commentId}`
    );
    return res?.data;
  });

  const upvoteQueryData = upvoteQuery?.data?.data;
  console.log({ upvoteQueryData });

  const updateCommentMutation = useMutation(
    async (data) => {
      const res = await axios.patch(
        `http://localhost:8000/products/update-product-comment/${id}/${commentId}`,
        data
      );
      return res.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['single-product', productId]);
        console.log('data', data);
      },
      onError: (error) => {
        console.log('error', error);
      },
    }
  );

  const deleteCommentMutation = useMutation(
    async () => {
      const res = await axios.delete(
        `http://localhost:8000/products/delete-product-comment/${id}/${commentId}`
      );
      return res.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['single-product', productId]);
        console.log('data', data);
      },
      onError: (error) => {
        console.log('error', error);
      },
    }
  );

  const toggleLikeMutation = useMutation(
    async (data) => {
      const res = await axios.get(
        `http://localhost:8000/products/toggle-product-comment-like/${id}/${commentId}`
      );
      return res.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['like-query', commentId]);
        queryClient.invalidateQueries(['single-product', productId]);
        console.log('data', data);
      },
      onError: (error) => {
        console.log('error', error);
      },
    }
  );

  const replyCommentMutation = useMutation(
    async (data: any) => {
      if (!id) {
        return alert('Please Login first');
      }
      const res = await axios.post(
        `http://localhost:8000/products/create-product-comment/${id}/${productId}`,
        { ...data, parentId: commentId }
      );
      return res.data;
    },
    {
      onError: (error) => {
        console.log('error', error);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(['single-product', productId]);
      },
    }
  );

  const handleUpdateComment = (data) => {
    updateCommentMutation.mutate(data);
  };

  const handleReplyComment = (data) => {
    replyCommentMutation.mutate(data);
  };

  const handleDeleteComment = () => {
    deleteCommentMutation.mutate();
  };

  const handleToggleProductCommentLike = () => {
    toggleLikeMutation.mutate();
  };

  return (
    <>
      <div className="">
        <div className="flex">
          <div className="relative flex items-center rounded-full">
            <img
              className="w-11 h-10 cursor-pointer rounded-full mb-16"
              src={commentedUser?.photo}
              alt="User Profile"
              referrerPolicy="no-referrer"
            />{' '}
          </div>
          <div className="flex flex-col gap-1 w-full rounded-md ">
            <div className="flex flex-col gap-1 p-2 text-gray-600 rounded-md bg-custom-light-dark ">
              <h2 className=" text-md">{commentedUser?.firstName}</h2>
              <p className="text-gray-300 text-sm">{comment}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleToggleProductCommentLike}>
                {upvoteQueryData?.likesCount}
                {upvoteQueryData?.likeExists ? (
                  <HeartIcon className="w-5 h-5 text-red-600" />
                ) : (
                  <HeartIcon className="h-5 w-5 text-gray-400" />
                )}
                {upvoteQueryData?.likesCount < 2 ? ' Like' : ' Likes'}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setIsReplying(!isReplying);
                }}
              >
                Reply
              </button>
              {commentedUserId === id ? (
                <>
                  <button
                    onClick={() => {
                      setIsReplying(false);
                      setIsEditing(!isEditing);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={handleDeleteComment}>Delete</button>
                </>
              ) : null}
              <span className="text-gray-200 text-xs opacity-40  hover:opacity-100 cursor-pointer">
                {dateFormatter.format(Date.parse(createdAt))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <CommentForm
          autoFocus
          onSubmit={handleUpdateComment}
          initialValue={comment}
        />
      )}

      {childComments?.length > 0 && (
        <>
          <div
            className={`nested-comments-stack ${
              areChildrenHidden ? 'hide' : ''
            }`}
          >
            <button
              className="collapse-line"
              aria-label="Hide Replies"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className="nested-comments">
              <CommentList
                getReplies={getReplies}
                comments={childComments || []}
              />
            </div>
          </div>
          <button
            className={`btn mt-1 ${!areChildrenHidden ? 'hide' : ''}`}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies
          </button>
        </>
      )}
      {isReplying && (
        <div className="mt-2 ml-3">
          <CommentForm autoFocus onSubmit={handleReplyComment} />
        </div>
      )}
    </>
  );
}

export default Comment;
