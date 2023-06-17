import { AppErrorProps } from '../types';
import AppError from './AppError';

class NotFound extends AppError {
    constructor(props: AppErrorProps) {
        super(props);
    }
}

export class CommunityNotFound extends NotFound {
    constructor(props: AppErrorProps) {
        super(props);
    }
}

export class PostNotFound extends NotFound {
    constructor(props: AppErrorProps) {
        super(props);
    }
}

export class CommentNotFound extends NotFound {
    constructor(props: AppErrorProps) {
        super(props);
    }
}

export class UserNotFound extends NotFound {
    constructor(props: AppErrorProps) {
        super(props);
    }
}
