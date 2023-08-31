/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { useAuth } from "../../../provider/authProvider"
import useAsync from "../../../hooks/useAsync"
import getChildComments from "../../../services/readChildComments"
import CommentList from "../commentList"
import "./style.css"
import CreateItem from "../../createItem"
import CommentModal from "./commentModal"
import Spinner from "../../spinner"
import createMarkup from "../../../services/getSanitizedHtml"
import DeleteItem from "../../buttons/deleteItem"
import deleteComment from "../../../services/removeComment"
import patchComment from "../../../services/patchComment"
import LikeIcon from "../../icons/LikeIcon"
import ReportIcon from "../../icons/ReportIcon"
import toastError from "../../toast/error"

export default function Comment({ comment, postId, handleDeleteComments }) {
  const { token } = useAuth()
  const [loading, execute, error] = useAsync()
  const [childComments, setChildComments] = useState([])
  const [showComments, setShowComments] = useState(
    comment["Replies"].length > 0 ? true : false
  )
  const { user } = useAuth()
  const [showAtachments, setShowAtachments] = useState(false)
  const handleClose = () => setShowAtachments(false)
  const handleShow = () => setShowAtachments(true)

  const handleComments = async (id) => {
    setShowComments(false)
    const response = await execute(getChildComments, token, id)
    if (response) {
      setChildComments(response)
    }
    if (error) {
      toastError(error)
    }
  }

  const handleAddChildComment = (comment) => {
    const comments = [...childComments, comment]
    setChildComments(comments)
  }

  const onDeleteChildComment = (id) => {
    let tempComments = [...childComments]
    tempComments = tempComments.filter((comment) => comment.id !== id)
    setChildComments(tempComments)
  }

  return (
    <div className="comment">
      <div className="border-start border-3 ps-2 comment-body mt-4 position-relative">
        <div>
          <span className="comment-name text-warning  m-0 fs-5 fw-bold">
            {`${comment.userName[0].toUpperCase()}${comment.userName
              .slice(1)
              .toLowerCase()}`}
          </span>
          <p
            className="comment-text text-warning m-0"
            dangerouslySetInnerHTML={createMarkup(comment.content)}
          />
          {comment["attachments"].length > 0 && (
            <p
              className="text-start  text-primary replies me-4"
              onClick={handleShow}
            >
              View Attachments
            </p>
          )}
          {showAtachments && (
            <CommentModal handleClose={handleClose} comment={comment} />
          )}
          <CreateItem
            itemName={"Reply Comment"}
            handeAddItem={handleAddChildComment}
            type={"replyCommet"}
            itemOptions={{
              requestBody: {
                parentCommentId: comment.id,
                postId: postId,
                userId: user._id,
              },
              // eslint-disable-next-line no-undef
              url: `${process.env.REACT_APP_API_URL}/comments/`,
            }}
          />
          <span className="position-absolute badges-top start-100 translate-middle badge rounded-pill bg-primary">
            <LikeIcon
              likes_={comment.likes}
              itemId={comment.id}
              serivceMethod={patchComment}
              data={{
                userId: user._id,
                typeId: comment.id,
                type: "comment",
                action: "like",
              }}
            />
            <span className="visually-hidden">unread messages</span>
          </span>
          <span className="position-absolute badges-top report-badge translate-middle badge rounded-pill bg-primary">
            <ReportIcon
              reports_={comment.reports}
              itemId={comment.id}
              serivceMethod={patchComment}
              data={{
                userId: user._id,
                typeId: comment.id,
                type: "comment",
                action: "report",
              }}
            />
            <span className="visually-hidden">unread messages</span>
          </span>
        </div>
      </div>
      <div className="ms-5">
        {showComments ? (
          <span
            className="text-warning replies"
            onClick={() => handleComments(comment.id)}
          >
            View Replies
          </span>
        ) : (
          <>
            {!loading ? (
              <CommentList
                comments={childComments}
                postId={postId}
                handleDeleteComments={onDeleteChildComment}
              />
            ) : (
              <Spinner />
            )}
          </>
        )}
      </div>

      {user.isAdmin && (
        <DeleteItem
          apiActionMethod={deleteComment}
          uiActionMethod={handleDeleteComments}
          id={comment.id}
        />
      )}
    </div>
  )
}
