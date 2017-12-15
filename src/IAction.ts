interface IAction<T> {
    type: string;
    payload: T;
}

export default IAction;