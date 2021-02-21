import PropTypes from "prop-types";
import styles from "./StoryList.module.css";
import Link from "next/link";

const StoryList = ({ stories = [] }) => {
  return (
    <div className={styles.storyList}>
      {stories.map((story) => {
        const {
          by = "",
          descendants = 0,
          id = 0,
          kids = [],
          score = 0,
          time = 0,
          title = "",
          type = "",
          url = "",
        } = story;

        return (
          <div className={styles.story} key={id}>
            <h2 className={styles.storyTitle}>
              <a href={url}>{title}</a>
            </h2>
            <div className={styles.storyDetails}>
              <span>{score} points</span>
              <Link href={`/story?id${id}`}>
                <a>{descendants} comments</a>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

StoryList.propTypes = {
  stories: PropTypes.array.isRequired,
};

export default StoryList;
