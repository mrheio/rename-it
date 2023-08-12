import { CaretDown, CaretUp } from '@/assets/icons';
import { Button, Card } from '@/components';
import { formatElapsedTime, getElapsedTime } from '@/utils';
import _CommentsSection from './_CommentsSection';

const Post = async ({ params }) => {
    const post = null;

    return (
        <main className="min-h-screen pt-navbar">
            <div className="mx-auto flex max-w-5xl justify-center gap-4 p-4">
                <section className="py-4">
                    <Card prose fluid>
                        <div className="mb-8 flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="flex flex-col text-lg">
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 hover:text-secondary"
                                    >
                                        <CaretUp weight="fill" />
                                        <span className="text-sm">
                                            {post.upvotes}
                                        </span>
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
                                </div>
                            </div>
                            <div>
                                <h4 className="mt-0 text-sm text-surface-500">
                                    posted by /u/{post.author.name}{' '}
                                    {formatElapsedTime(
                                        getElapsedTime(post.createdAt)
                                    )}
                                </h4>
                                <h2 className="mb-0">{post.title}</h2>
                            </div>
                        </div>
                        <p>{post.markdown}</p>
                    </Card>

                    <div className="mt-12 [&>*+*]:mt-4">
                        <_CommentsSection post={post} />
                    </div>
                </section>

                <aside className="hidden md:block md:w-[40%] md:max-w-xs">
                    <div className="sticky top-[7rem] pt-[1rem] [&>*+*]:mt-8">
                        <Button fluid>New Post</Button>
                        <div className="prose rounded-md bg-surface-950 p-4 dark:prose-invert">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Placeat dolor beatae sequi velit quasi sunt
                            dolorum totam ducimus molestias! Hic corrupti amet
                            recusandae error modi autem ullam ratione
                            repudiandae aperiam iure quos reprehenderit
                            molestiae praesentium voluptas quis delectus vel,
                            mollitia ab soluta nobis fuga nulla sequi. Nulla,
                            neque delectus. Voluptate eius soluta pariatur omnis
                            molestias officiis eum enim ratione aperiam. B
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
};

export default Post;
