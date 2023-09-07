import AppSuccess from './AppSuccess';

export default abstract class UsersSuccess extends AppSuccess {
    static getOne(user) {
        return new GetUserSuccess(user);
    }
}

class GetUserSuccess extends UsersSuccess {
    constructor(user) {
        super({ message: 'User returned', payload: user });
    }
}
