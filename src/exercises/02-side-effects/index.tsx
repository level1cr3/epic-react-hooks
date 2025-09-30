import { useEffect, useState } from "react";
import { generateGradient, getMatchingPosts } from "@/shared/blog-posts";
import { setGlobalSearchParams } from "@/shared/utils";

function getQueryParam() {
  const params = new URLSearchParams(window.location.search);
  return params.get("query") ?? "";
}

function Effect() {
  const [query, setQuery] = useState(getQueryParam);

  const words = query.split(" ");

  const dogChecked = words.includes("dog");
  const catChecked = words.includes("cat");
  const caterpillarChecked = words.includes("caterpillar");

  useEffect(() => {
    const handlePopState = () => {
      const queryParams = getQueryParam();
      setQuery(queryParams); // setting the query to updated queryParams

      // You asked if you can just do:
      // setQuery(getQueryParam);
      // This is not equivalent. React’s setState setter has two possible signatures:
      // setState(value) → sets state directly to that value.
      // setState(updaterFn) → treats argument as a function (prev) => newState.
      // So if you do setQuery(getQueryParam), React will think you’re passing an updater function, not the evaluated params.
      // That means React will call getQueryParam(prevState) with the previous state, which is not what you want unless your getQueryParam happens to accept a parameter and ignore it.
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // 🐨 add a useEffect(() => {}, []) call here (we'll talk about that empty array later)
  // 🐨 in the useEffect callback, subscribe to window's popstate event
  // 🦉 if that doesn't make sense to you... don't worry, it's supposed to be broken! We'll fix it next
  // 🐨 your event handler should call setQuery to getQueryParam()
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

  function handleCheck(tag: string, checked: boolean) {
    const newWords = checked ? [...words, tag] : words.filter((w) => w !== tag);
    setQuery(newWords.filter(Boolean).join(" ").trim());
  }

  return (
    <div className="app">
      <form
        action={() => {
          setGlobalSearchParams({ query });
        }}
      >
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
              type="checkbox"
              checked={dogChecked}
              onChange={(e) => handleCheck("dog", e.currentTarget.checked)}
            />{" "}
            🐶 dog
          </label>
          <label>
            <input
              type="checkbox"
              checked={catChecked}
              onChange={(e) => handleCheck("cat", e.currentTarget.checked)}
            />{" "}
            🐱 cat
          </label>
          <label>
            <input
              type="checkbox"
              checked={caterpillarChecked}
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

export default Effect;

/*
This 1st problem where when click browser back button it removes. some params like out of dog cat. It remove cat. but that is not getting updated in search input.
'This is something in real application done by 'hooks provided by the router libraries'


// when user tries to go back and forward in the web browser that event is called 'popstate' event.


*/
