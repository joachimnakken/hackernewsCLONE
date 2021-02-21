import React from "react";

export default ({ stories }) => {
  console.log({ stories });
  return (
    <div>
      Hacker news
      {stories.map((story) => {
        console.log({ story });
        return <div>{story.title}</div>;
      })}
    </div>
  );
};

export async function getStaticProps() {
  let stories = [];
  const url = "https://hacker-news.firebaseio.com/v0/topstorisses.json";
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
    console.log({ result });
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
