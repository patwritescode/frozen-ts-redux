import IAction from "./IAction";

class Action<T> implements IAction<T> {
    constructor(type: string) {
        this.type = type;
    }
    type: string;
    payload: T;
    with = (payload: T): IAction<T> => {
        return {
            payload,
            type: this.type,
        }
    }
}

export default Action;