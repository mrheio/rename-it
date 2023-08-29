import AppSuccess from './AppSuccess';

export default abstract class CommentsSuccess extends AppSuccess {
    constructor(props) {
        super({
            code: props.code,
            message: props.message,
            payload: props.payload,
        });
    }

    static get(comments) {
        return new GetCommentsSuccess(comments);
    }
}

class GetCommentsSuccess extends CommentsSuccess {
    constructor(comments) {
        super({ message: 'Comments returned.', payload: { items: comments } });
    }
}
