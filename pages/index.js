import Error from "next/error";
import StoryList from "../components/StoryList/StoryList";

const App = ({ stories }) => {
  if (stories.length === 0) return <Error statusCode={503} />;

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
