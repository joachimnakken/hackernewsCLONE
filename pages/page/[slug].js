import Error from "next/error";
import StoryList from "../../components/StoryList/StoryList";

const NewsPage = ({ stories }) => {
  if (stories.length === 0) return <Error statusCode={503} />;
  return (
    <>
      <StoryList stories={stories} />
    </>
  );
};

export async function getServerSideProps({ query: { slug = "" } = {} }) {
  let stories = [];
  const slugInteger = +slug;
  const url = "https://hacker-news.firebaseio.com/v0/topstories.json";
  const storiesToShow = 30;
  const startSlice = storiesToShow * slugInteger;
  const endSlice = startSlice + storiesToShow;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Response Error:" + res.text);
    }
    const json = await res.json();
    const promises = json
      .slice(startSlice, endSlice)
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
  };
}

export default NewsPage;
