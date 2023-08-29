import { CaretDown } from '@/assets/icons';
import { Button } from '@/components';
import { CONFIG } from '../../config';
import _PostCard from './_PostCard';

export const revalidate = 300;

const Home = async () => {
    const res = await fetch(`${CONFIG.API_URL}/posts`);

    const posts = (await res.json()).payload.items;

    return (
        <main className="min-h-screen pt-navbar">
            <div className="mx-auto flex max-w-5xl justify-center gap-4 p-4">
                <section className="py-4 [&>*+*]:mt-4">
                    <div className="h-[2rem]">
                        sort posts by{' '}
                        <button
                            type="button"
                            className="font-semibold text-secondary"
                        >
                            trending
                            <CaretDown
                                weight="fill"
                                className="ml-1 inline-block"
                            />
                        </button>
                    </div>
                    {posts.map((post, i) => (
                        <_PostCard post={post} />
                    ))}
                </section>

                <aside className="hidden pt-[3rem] md:block md:w-[40%] md:max-w-xs">
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

export default Home;
