import Comment from './Comment';

interface Props {
  post: any;
  postId: string;
  getReplies: (data: any) => any;
  comments: any[];
}

function CommentList({ post, comments, getReplies, postId }: Props) {
  return (
    <>
      {comments.map((comment: any) => (
        <div key={comment.id} className="flex flex-col gap-2">
          <Comment
            post={post}
            postId={postId}
            getReplies={getReplies}
            {...comment}
          />
        </div>
      ))}
    </>
  );
}

export default CommentList;
