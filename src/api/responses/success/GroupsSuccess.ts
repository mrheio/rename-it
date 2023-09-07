import AppSuccess from './AppSuccess';

export default abstract class GroupsSuccess extends AppSuccess {
    static get(groups) {
        return new GetGroupsSuccess(groups);
    }
}

class GetGroupsSuccess extends GroupsSuccess {
    constructor(groups) {
        super({ message: 'Groups returned', payload: { items: groups } });
    }
}
