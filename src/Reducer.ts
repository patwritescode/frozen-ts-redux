import IHandler from "./IHandler";
import Action from "./Action";
import IAction from "./IAction";
import { deepUnfreeze, deepFreeze } from "./freeze";

class Reducer<T> {
    private readonly defaultState: T;
    private handlers: IHandler<T>[] = [];
    constructor(defaultState: T) {
        this.defaultState = deepFreeze(defaultState);
    }
    
    register = <S>(actionCreator: IAction<S>, handler: (state: T, payload: S) => T): Reducer<T> => {
        this.handlers.push({
            type: actionCreator.type,
            callback: handler,
        });
        return this;
    }

    instance = (state: T = this.defaultState, action: IAction<T>) => {
        const matchingHandler = this.handlers.filter(handler => handler.type === action.type)[0];
        if(matchingHandler !== null && matchingHandler !== undefined) {
            const unfrozen = deepUnfreeze(state);
            const newState = matchingHandler.callback(unfrozen, action.payload);
            return deepFreeze(newState);
        }
        return state;
    }
}

export default Reducer;