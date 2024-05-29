import { useReducer } from "react";
const initialState = { count: 0 };
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };

    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatcher] = useReducer(reducer, initialState);
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatcher({ type: "increment" })}>
        increment+1
      </button>
      <button onClick={() => dispatcher({ type: "decrement" })}>
        decremtn+1
      </button>
    </div>
  );
}
export default Counter;
