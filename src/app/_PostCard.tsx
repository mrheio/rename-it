import {
    Bookmark,
    CaretDown,
    CaretUp,
    EyeSlash,
    ShareNetwork,
} from '@/assets/icons';
import { Card } from '@/components';
import Link from 'next/link';

const _PostCard = ({ post }) => {
    return (
        <Link href="#" className="block" key={post.id}>
            <Card prose fluid highlightable>
                <h2>{post.title}</h2>
                <p className="line-clamp-3">{post.content}</p>
                <div className="flex justify-between gap-4">
                    <span className="flex items-center gap-2">
                        <span className="flex flex-col text-lg">
                            <button
                                type="button"
                                className="flex items-center gap-2 hover:text-secondary"
                            >
                                <CaretUp weight="fill" />
                                <span className="text-sm">
                                    {post.total_likes}
                                </span>
                            </button>
                            <button
                                type="button"
                                className="flex items-center gap-2 hover:text-secondary"
                            >
                                <CaretDown weight="fill" />
                                <span className="text-sm">
                                    {post.total_dislikes}
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
