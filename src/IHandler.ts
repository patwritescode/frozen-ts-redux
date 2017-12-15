interface IHandler<T> {
    callback: (state: T, payload: any) => T;
    type: string;
}

export default IHandler;