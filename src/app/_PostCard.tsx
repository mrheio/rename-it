import {
    Bookmark,
    CaretDown,
    CaretUp,
    EyeSlash,
    ShareNetwork,
} from '@/assets/icons';
import { Card } from '@/components';
import { ROUTES } from '@/router';
import { Post } from '@/schemas';
import Link from 'next/link';

type _PostCardProps = {
    post: Post;
};

const _PostCard = ({ post }: _PostCardProps) => {
    return (
        <Link
            href={ROUTES.POST(post['@id'])}
            className="block"
            key={post['@id']}
        >
            <Card prose fluid highlightable>
                <h2>{post.title}</h2>
                <p className="line-clamp-3">{post.markdown}</p>
                <div className="flex justify-between gap-4">
                    <span className="flex items-center gap-2">
                        <span className="flex flex-col text-lg">
                            <button
                                type="button"
                                className="flex items-center gap-2 hover:text-secondary"
                            >
                                <CaretUp weight="fill" />
                                <span className="text-sm">{post.upvotes}</span>
                            </button>
                            <button
                                type="button"
                                className="flex items-center gap-2 hover:text-secondary"
                            >
                                <CaretDown weight="fill" />
                                <span className="text-sm">
                                    {post.downvotes}
                                </span>
                            </button>
                        </span>
                    </span>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            className="flex items-center gap-2 hover:text-secondary"
                        >
                            <ShareNetwork weight="fill" />
                            Share
                        </button>
                        <button
                            type="button"
                            className="flex items-center gap-2 hover:text-secondary"
                        >
                            <Bookmark weight="fill" />
                            Save
                        </button>
                        <button
                            type="button"
                            className="flex items-center gap-2 hover:text-secondary"
                        >
                            <EyeSlash weight="fill" />
                            Hide
                        </button>
                    </div>
                </div>
            </Card>
        </Link>
    );
};

export default _PostCard;
