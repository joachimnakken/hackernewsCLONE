import { format } from "date-fns";
import Error from "next/error";

import nbLocale from "date-fns/locale/nb";

const Story = ({ story }) => {
  const { score, kids, time } = story;
  const newDate = new Date(0);
  newDate.setUTCSeconds(time);

  if (!story) return <Error statusCode={503} />;
  return (
    <main>
      <h1>
        <a></a>
      </h1>
      <div className="storyDetails">
        <strong> {score}</strong>
        <strong>{kids.length}</strong>
        <strong>{format(newDate, "dd.LLL.yy", { locale: nbLocale })}</strong>
      </div>
    </main>
  );
};

export async function getServerSideProps({ query: { id = "" } = {} }) {
  let story;

  try {
    story = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    ).then((res) => {
      console.log({ res });
      return res.json();
    });
  } catch {
    story = null;
  }

  return {
    props: { story },
  };
}

export default Story;
