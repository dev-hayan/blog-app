/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { useAuth } from "../../provider/authProvider"
import getPostComments from "../../services/readPostComments"
import CreateItem from "../createItem"
import CommentList from "./commentList"
import useAsync from "../../hooks/useAsync"
import Spinner from "../spinner"

export default function CommentSecion({
  handleComments,
  postId,
  handleAddComment,
  comments,
  handleDeleteComments
}) {
  const [loading, execute] = useAsync()
  const { token, user } = useAuth()
  const [showComments, setShowComments] = useState(false)

  const handleGetComments = async () => {
    setShowComments(true)
    const response = await execute(getPostComments, token, postId)
    if (response) {
      handleComments(response)
    }
  }

  return (
    <div className="border-top pt-2">
      {!showComments ? (
        <button
          type="button"
          className="btn btn-outline-primary btn-sm me-2"
          onClick={handleGetComments}
        >
          Show Comments
        </button>
      ) : (
        <div className="comment-section mb-2">
          <div className="d-flex justify-content-between mb-2">
            <CreateItem
              itemName={"Add Comment"}
              handeAddItem={handleAddComment}
              type={""}
              itemOptions={{
                requestBody: {
                  postId: postId,
                  userId: user._id,
                },
                // eslint-disable-next-line no-undef
                url: `${process.env.REACT_APP_API_URL}/comments/`,
              }}
            />
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => setShowComments(false)}
            >
              Hide
            </button>
          </div>
          <div className="inner-comment-section ps-2 pe-2">
            {comments.length > 0 ? (
              <CommentList comments={comments} postId={postId} handleDeleteComments={handleDeleteComments} />
            ) : (
              <div className="text-warning no-comments">
                {!loading ? "No Comments found" : <Spinner />}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
