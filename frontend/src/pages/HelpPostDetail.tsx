import { useParams } from 'react-router-dom';
import { CommentForm } from '../components/comment/CommentForn';
import { useQueryClient } from '@tanstack/react-query';
function HelpPostDetail() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data } = queryClient.getQueryData(['help-posts']) as any;
  const [post] = data.posts.filter((i: any) => i.id === id);

  return (
    <>
      <h1>{post.title}</h1>
      <article>{post.body}</article>
      <h3 className="comments-title">Comments</h3>
      <section>
        <CommentForm loading="" error="" onSubmit="" />
        {/* {rootComments != null && rootComments.length > 0 && (
          <div className="mt-4">
            <CommentList comments={rootComments} />
          </div>
        )} */}
      </section>
    </>
  );
}

export default HelpPostDetail;
