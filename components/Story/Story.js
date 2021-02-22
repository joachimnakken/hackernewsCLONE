import React from "react";
import styles from "./Story.module.css";
import nbLocale from "date-fns/locale/nb";
import format from "date-fns/format";
import CommentList from "../CommentList/CommentList";

export default ({ story, comments }) => {
  const { score = 0, kids = [], time = 0, title = "", url = "" } = story;
  const newDate = new Date(0);
  newDate.setUTCSeconds(time);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        <a href={url}>{title}</a>
      </h1>
      <div className={styles.storyDetails}>
        <strong> {score} points</strong>
        <strong>{kids.length} comments</strong>
        <strong>{format(newDate, "dd.LLL.yyyy", { locale: nbLocale })}</strong>
      </div>

      {kids.length > 0 ? (
        <CommentList comments={comments} />
      ) : (
        <div> No comments for this story...</div>
      )}
    </main>
  );
};
