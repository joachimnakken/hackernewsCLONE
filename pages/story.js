import Error from "next/error";

import Story from "../components/Story";

const StoryComponent = ({ story, commentsArray }) => {
  if (!story) return <Error statusCode={503} />;
  return <Story comments={commentsArray} story={story} />;
};

export async function getServerSideProps({ query: { id = "" } = {} }) {
  let story = null;
  let commentsArray = [];

  const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Response Error:" + res.text);
    }
    story = await res.json();
    const promises = story.kids.map((id) =>
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      ).then((res) => res.json())
    );
    commentsArray = await Promise.all(promises);
  } catch (err) {
    console.error(err);
  }

  return {
    props: { story, commentsArray },
  };
}

export default StoryComponent;
