import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import CommentForm from '../components/comment/CommentForm';
import CommentList from '../components/comment/CommentList';
import axios from '../utils/axios-instance';

import { useMutation, useQuery, useQueryClient } from 'react-query';

const HelpPostDetail = () => {
  console.log('detial page');
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { user } = useSelector((state: any) => state.auth);

  const { data, isLoading } = useQuery(['single-post', id], async () => {
    const res = await axios.get(`/api/help-posts/${id}`);
    return res.data;
  });

  const singlePostData = data?.data?.post;

  // console.log('single post data', singlePostData);

  const postComments = singlePostData?.comments;
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

      const res = await axios.post(
        `api/help-posts/${singlePostData.id}/comments`,
        data
      );
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
    <div>
      {singlePostData && (
        <div>
          <h1>{singlePostData.title}</h1>
          <p>{singlePostData.body}</p>
        </div>
      )}
      <section
        className="h-[480px] overflow-y-scroll
      "
      >
        <CommentForm onSubmit={createComment} autoFocus />
        {rootComments != null && rootComments.length > 0 && (
          <div className="mt-4">
            <CommentList
              comments={rootComments}
              getReplies={getReplies}
              post={singlePostData}
              postId={id}
              // createdAt={singlePostData.createdAt}
              // updatedAt={singlePostData.updatedAt}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default HelpPostDetail;
