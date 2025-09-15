import { generateGradient, getMatchingPosts } from "@/shared/blog-posts";
import { useState } from "react";

function Exercise() {
  const [query, setQuery] = useState("");

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
              type="checkbox"
              onChange={(e) => handleCheck("cat", e.currentTarget.checked)}
            />{" "}
            🐱 cat
          </label>
          <label>
            <input
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
