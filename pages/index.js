import Error from "next/error";
import { useEffect } from "react";
import StoryList from "../components/StoryList/StoryList";

const App = ({ stories }) => {
  if (stories.length === 0) return <Error statusCode={503} />;

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      console.log({ navigator, NavSW: navigator.serviceWorker });
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(function (registration) {
          console.log(
            "Service worker registration great success",
            registration
          );
        })
        .catch((err) =>
          console.warn("Service worker registration failed", err.message)
        );
    }
  }, []);

  return (
    <>
      <StoryList stories={stories} />
    </>
  );
};

export async function getStaticProps() {
  let stories = [];
  const url = "https://hacker-news.firebaseio.com/v0/topstories.json";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Response Error:" + res.text);
    }
    const json = await res.json();
    const promises = json
      .slice(0, 30)
      .map((id) =>
        fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        ).then((res) => res.json())
      );
    const result = await Promise.all(promises);
    stories = result;
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      stories,
    },
    revalidate: 600,
  };
}

export default App;
