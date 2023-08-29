import AppSuccess from './AppSuccess';

export default abstract class PostsSuccess extends AppSuccess {
    constructor(props) {
        super({
            code: props.code,
            message: props.message,
            payload: props.payload,
        });
    }

    static get(posts) {
        return new GetPostsSuccess(posts);
    }

    static getOne(post) {
        return new GetPostSuccess(post);
    }
}

class GetPostsSuccess extends PostsSuccess {
    constructor(posts) {
        super({
            message: 'Posts returned.',
            payload: { items: posts },
        });
    }
}

class GetPostSuccess extends PostsSuccess {
    constructor(post) {
        super({
            message: 'Post returned.',
            payload: { ...post },
        });
    }
}
