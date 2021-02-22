import PropTypes from "prop-types";
import Comment from "./Comment";

const CommentList = ({ comments = [] }) => {
  console.log({ comments });

  return (
    <>
      {comments.map((c) => {
        return <Comment comment={c} />;
      })}
    </>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default CommentList;
