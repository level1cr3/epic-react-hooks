import "./App.css";
import { Form, MatchingPosts } from "./exercises/03-lifting-state";

function App() {
  // 🐨 add the useState for the query here (lift it up from the Form)
  return (
    <div className="app">
      {/* 🐨 pass the query and setQuery to the form */}
      <Form />
      {/* 🐨 pass the query to this prop */}
      <MatchingPosts query="" />
    </div>
  );
}

export default App;
