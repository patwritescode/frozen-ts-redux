import Reducer from "./src/Reducer";
import Action from "./src/Action";

const action = new Action<string>("EXAMPLE:UPDATE_EXAMPLE_TEXT");

interface IExampleState {
    exampleText: string;
}

const reducer = new Reducer<IExampleState>({
    exampleText: "",
})
.register(action, (state, payload) => {
    state.exampleText = payload;
    return state;
})