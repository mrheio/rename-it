import { STATUS_CODES } from '../constants';
import AppError from './AppError';

export default abstract class PostsError extends AppError {
    constructor(props) {
        super({
            code: props.code,
            message: props.message,
            details: props.details,
        });
    }

    static notFound(id: string) {
        return new PostNotFoundError(id);
    }
}

class PostNotFoundError extends PostsError {
    constructor(id: string) {
        super({
            code: STATUS_CODES.NOT_FOUND,
            message: `Post with id ${id} does not exist.`,
            details: { id },
        });
    }
}
