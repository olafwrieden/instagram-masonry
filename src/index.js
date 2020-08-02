import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import useWindowScroll from "@react-hook/window-scroll";
import { styles } from "./theme";
import { Masonry } from "masonic";

const App = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const [isFetching, setIsFetching] = useState(false);
  const [hashtag] = useState(params.get("hashtag") || "puppies");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!hashtag) return;

    const fetchData = async () => {
      setIsFetching(true);
      const response = await fetch(
        `https://www.instagram.com/explore/tags/${hashtag}/?__a=1`
      );
      const data = await response.json();
      setData(data.graphql.hashtag.edge_hashtag_to_media.edges);
      setIsFetching(false);
    };

    fetchData();
  }, [hashtag]);

  return (
    <main className={style("container")}>
      <div className={style("masonic")}>
        {hashtag === "puppies" && !isFetching && (
          <p className={style("loading")}>
            Tip: add a <pre>/?hashtag=eventname</pre> to the URL to see specific
            tags
          </p>
        )}
        <Masonry
          items={data}
          columnGutter={8}
          columnWidth={172}
          overscanBy={5}
          render={Card}
        />
      </div>
      <Header hashtag={hashtag} />
      {isFetching && (
        <p className={style("loading")}>
          <span role="img" aria-label="camera">
            🤙🏼
          </span>{" "}
          Hang Tight..
        </p>
      )}
    </main>
  );
};

const Card = ({ data: { node } }) => (
  <div className={style("card")}>
    <img
      className={style("img")}
      alt={node.accessibility_caption}
      src={node.display_url}
    />
  </div>
);

const Header = ({ hashtag }) => {
  const scrollY = useWindowScroll(5);
  return (
    <h1 className={style("header", scrollY > 64 && "minify")}>
      Tag <span style={{ fontWeight: "700" }}>#{hashtag}</span>
      <span role="img" aria-label="camera">
        {" "}
        📸
      </span>{" "}
      on Instagram
    </h1>
  );
};

const style = styles({
  loading: `
    text-align: center;
  `,
  masonic: `
    padding: 8px;
    width: 100%;
    max-width: 960px;
    margin: 163px auto 0;
    box-sizing: border-box;
  `,
  container: `
    min-height: 100vh;
    width: 100%;
  `,
  minify: ({ pad, color }) => `
    padding: ${pad.md};
    background-color: ${color.dark};
    color: ${color.light};
  `,
  header: ({ pad, color }) => `
    font-family: Quantico, sans-serif;
    font-size: 1.5rem;
    
    letter-spacing: -0.075em;
    color: ${color.body};
    top: 0;
    position: fixed;
    padding: ${pad.xl};
    z-index: 1000;
    width: 100%;
    text-align: center;
    transition: padding 200ms ease-in-out, background-color 200ms 200ms linear;
  `,
  card: ({ shadow, color, pad, radius }) => `
    display: flex;
    flex-direction: column;
    background: ${color.dark};
    border-radius: ${radius.lg};
    justify-content: center;
    align-items: center;
    transition: transform 100ms ease-in-out;
    width: 100%;
    min-height: 100px;

    span:last-of-type {
      color: #fff;
      padding: ${pad.md};
    }

    &:hover {
      position: relative;
      background: ${color.light};
      transform: scale(1.125);
      z-index: 1000;
      box-shadow: ${shadow.lg};

      span:last-of-type {
        color: ${color.dark};
        padding: ${pad.md};
      }
    }
  `,
  img: ({ radius }) => `
    width: 100%;
    display: block;
    border-radius: ${radius.md};
    display: block;
  `,
});

ReactDOM.render(<App />, document.getElementById("root"));
