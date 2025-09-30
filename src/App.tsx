import { useState } from "react";
import "./App.css";
import Effect from "./exercises/02-side-effects";

function App() {
  const [showForm, setShowForm] = useState(true);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={showForm}
          onChange={(e) => setShowForm(e.currentTarget.checked)}
        />{" "}
        show form
      </label>
      {showForm ? <Effect /> : null}
    </div>
  );
}

export default App;
