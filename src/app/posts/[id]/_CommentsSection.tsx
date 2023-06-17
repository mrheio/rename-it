import { getPostComments } from '@/api';
import { Post } from '@/schemas';
import _CommentCard from './_CommentCard';
import _CommentInput from './_CommentInput';

type _CommentsSectionProps = {
    post: Post;
};

const _CommentsSection = async ({ post }: _CommentsSectionProps) => {
    const comments = await getPostComments(post['@id']);

    return (
        <>
            <_CommentInput />
            {comments.items.map((comment, i) => (
                <_CommentCard key={comment['@id']} comment={comment} />
            ))}
        </>
    );
};

export default _CommentsSection;
