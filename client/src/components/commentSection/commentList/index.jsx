/* eslint-disable react/prop-types */
import { default as Comment } from "../comments"
import "./style.css"

const CommentList = ({ comments, postId, handleDeleteComments }) => (
  <>
    <div className="comment-list">
      {comments.map((comment, index) => (
        <Comment
          key={index}
          comment={comment}
          postId={postId}
          handleDeleteComments={handleDeleteComments}
        />
      ))}
    </div>
  </>
)

export default CommentList
