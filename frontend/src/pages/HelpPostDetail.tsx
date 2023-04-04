import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import CommentForm from '../components/comment/CommentForm';
import CommentList from '../components/comment/CommentList';
import axios from '../utils/axios-instance';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
const HelpPostDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { user } = useSelector((state: any) => state.auth);

  const { data, isLoading } = useQuery(['single-post', id], async () => {
    const res = await axios.get(`/api/help-posts/${id}`);
    return res.data;
  });

  const post = data?.data?.post;

  const postComments = post?.comments;
  console.log('post comment', postComments);

  const commentsByParentId = useMemo(() => {
    const payload = {};
    postComments?.forEach((comment) => {
      payload[comment.parentId] ||= [];
      payload[comment.parentId].push(comment);
    });
    return payload;
  }, [postComments]);

  function getReplies(parentId) {
    return commentsByParentId[parentId];
  }

  const createCommentMutation = useMutation(
    async (data) => {
      if (!user.id) {
        return alert('Please login first');
      }

      const res = await axios.post(`api/help-posts/${post.id}/comments`, data);
      return res.data;
    },
    {
      onError: (error) => {
        console.log('error', error);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(['single-post', id]);
      },
    }
  );

  function createComment(data) {
    createCommentMutation.mutate(data);
  }

  let rootComments = commentsByParentId['null'];
  console.log('root comments', rootComments);
  if (isLoading) return <div>Loading.... </div>;

  return (
    <>
      <Link to={`/collaborator`}>
        <ArrowLeftIcon className="h-8 flex-shrink-0 text-custom-light-green" />
      </Link>
      <div className="mt-2 mx-10 mb-16 max-w-screen-md rounded-2xl border p-4  bg-gray-300 text-black">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src={post.user.photoUrl}
              alt={`${post.user.username}'s profile`}
              className="h-10 w-10 rounded-full bg-yellow-500 object-cover"
            />
            <div className="flex flex-col">
              <p className="mb-2 capitalize text-sm">{post.user.username}</p>
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
      <div>
        <h2 className="text-white mb-4">Comments</h2>
        <section
          className="h-[340px] overflow-y-scroll
      "
        >
          <CommentForm onSubmit={createComment} autoFocus />
          {rootComments != null && rootComments.length > 0 && (
            <div className="mt-4">
              <CommentList
                comments={rootComments}
                getReplies={getReplies}
                post={post}
                postId={id}
              />
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default HelpPostDetail;
