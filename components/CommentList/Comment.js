import styles from "./Comment.module.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Comment = ({ comment }) => {
  const [nestedComments, setNestedComments] = useState([]);
  const { kids = [], by = "", text = "" } = comment;

  const _getNestedComments = async () => {
    if (kids.length < 1) return;
    try {
      const promises = kids.map((id) =>
        fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        ).then((res) => res.json())
      );
      setNestedComments(await Promise.all(promises));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    _getNestedComments();
  }, []);

  return (
    <div className={styles.comment}>
      <div className={styles.commentUser}> {by}</div>
      <div
        className={styles.commentContent}
        dangerouslySetInnerHTML={{ __html: text }}
      />
      {kids.length > 0 && (
        <div className={styles.nestedComment}>
          {nestedComments.map((nestedComment) => {
            return <Comment comment={nestedComment} />;
          })}
        </div>
      )}
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
