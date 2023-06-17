import {
    ArrowBendDownRight,
    ArrowFatDown,
    ArrowFatUp,
    DotsThreeOutline,
    ShareNetwork,
} from '@/assets/icons';
import { Avatar, Card, Title } from '@/components';
import { Comment } from '@/schemas';
import { formatElapsedTime, getElapsedTime } from '@/utils';

type _CommentCard = {
    comment: Comment;
    props?: unknown;
};

const _CommentCard = ({ comment, ...props }: _CommentCard) => {
    return (
        <Card fluid className="max-w-prose" {...props}>
            <div className="flex items-center gap-2 font-accent">
                <Avatar size="small">LC</Avatar>
                <Title weight="semibold" size="xs">
                    {comment.author.name}
                </Title>
                <span className="font-light">
                    {formatElapsedTime(getElapsedTime(comment.createdAt))}
                </span>
            </div>

            <p className="mt-6">{comment.markdown}</p>

            <div className="mt-4 flex justify-between gap-6">
                <div className="flex gap-4">
                    <button
                        type="button"
                        className="flex items-center gap-2 hover:text-secondary"
                    >
                        <ArrowFatUp /> 2
                    </button>
                    <button
                        type="button"
                        className="flex items-center gap-2 hover:text-secondary"
                    >
                        <ArrowFatDown /> 2
                    </button>
                </div>

                <div className="flex gap-4">
                    <button
                        type="button"
                        className="flex items-center gap-2 hover:text-secondary"
                    >
                        <ArrowBendDownRight /> Reply
                    </button>
                    <button
                        type="button"
                        className="flex items-center gap-2 hover:text-secondary"
                    >
                        <ShareNetwork /> Share
                    </button>
                    <button
                        type="button"
                        className="flex items-center gap-2 text-xl hover:text-secondary"
                        title="menu"
                    >
                        <DotsThreeOutline />
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default _CommentCard;
