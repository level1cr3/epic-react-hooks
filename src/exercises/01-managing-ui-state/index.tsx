import { generateGradient, getMatchingPosts } from "@/shared/blog-posts";
import { useState } from "react";

const getQueryPram = () => {
  const params = new URLSearchParams(window.location.search); // in real application router will give us searchParams hook or something like that.
  const initialQuery = params.get("query") ?? ""; // https://localhost:5173/?query=dog+cat    In a URL, the + sign is used to represent a space character when encoding query parameters.
  return initialQuery;
};

function Exercise() {
  const [query, setQuery] = useState(getQueryPram);

  // Driving state from query: currently when typing (dog) in the query checkbox is not getting checked.
  const words = query.split(" ");
  const dogChecked = words.includes("dog");
  const catChecked = words.includes("cat");
  const caterpillarChecked = words.includes("caterpillar");

  // try to drive the state if it drivable from other states.
  // important takeaway : when we are talking about controlled inputs. we don't necessarily have to have the controlled value of that input being result of onchange in that input.
  // they can also be controlled by state that are being fed on like in our case dogChecked, catChecked, caterpillarChecked.

  const handleCheck = (tag: string, checked: boolean) => {
    checked
      ? setQuery(`${query} ${tag}`)
      : setQuery(query.replace(tag, "").toString());
    // without trim() it won't work properly because we are passing same string. and useState won't know what changed. trim() gives us brand new string.
    // or we could use string literal, or toString
  };

  return (
    <div className="app">
      <form>
        <div>
          <label htmlFor="searchInput">Search:</label>
          <input
            id="searchInput"
            name="query"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
        </div>
        <div>
          <label>
            <input
              checked={dogChecked}
              type="checkbox"
              value="dog"
              onChange={(e) =>
                handleCheck(e.currentTarget.value, e.currentTarget.checked)
              }
            />{" "}
            🐶 dog
          </label>
          <label>
            <input
              checked={catChecked}
              type="checkbox"
              onChange={(e) => handleCheck("cat", e.currentTarget.checked)}
            />{" "}
            🐱 cat
          </label>
          <label>
            <input
              checked={caterpillarChecked}
              type="checkbox"
              onChange={(e) =>
                handleCheck("caterpillar", e.currentTarget.checked)
              }
            />{" "}
            🐛 caterpillar
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      <MatchingPosts query={query} />
    </div>
  );
}

function MatchingPosts({ query }: { query: string }) {
  const matchingPosts = getMatchingPosts(query);

  return (
    <ul className="post-list">
      {matchingPosts.map((post) => (
        <li key={post.id}>
          <div
            className="post-image"
            style={{ background: generateGradient(post.id) }}
          />
          <a
            href={post.id}
            onClick={(event) => {
              event.preventDefault();
              alert(`Great! Let's go to ${post.id}!`);
            }}
          >
            <h2>{post.title}</h2>
            <p>{post.description}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default Exercise;

/*

**important**
> Initial callback function: we can use this to set the initial value of our use state.

# why would we want to use initial callback function ?
>  Imagine be getting initial value is expensive function. and we get that value and pass it to useState.
> Issue comes when we re-render that component. we are again executing that expensive function even though we only needed it for every first time.  
 and that is the reason we would use something like initial callback function.

 ex: 

 // bad approach.
 const initialValue = calculateInitialValue(); // we would be calculating this every time component re-renders. Even though we only need it for initial value.
 const [val,setVal] = useState(initialValue);

 // good approach
 const [val,setVal] = useState(()=>{
  const initialValue = calculateInitialValue();
  return initialValue
 });


*/
