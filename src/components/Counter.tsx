import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  return <button onClick={increment}>Count : {count}</button>;
};

export default Counter;

// hooks keeps these state value outside of component. so re-render doesn't reset them. Always use hooks on top level of component
