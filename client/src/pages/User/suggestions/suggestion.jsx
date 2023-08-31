/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState } from "react"
import PostModal from "../../../components/postModal"
import createMarkup from "../../../services/getSanitizedHtml"
import UpdateItem from "../../../components/updateItem"
import useAsync from "../../../hooks/useAsync"
import { useAuth } from "../../../provider/authProvider"
import Spinner from "../../../components/spinner"
import patchSuggestion from "../../../services/patchPost"
import toastSuccess from "../../../components/toast/success"

export const Suggestion = ({
  type,
  suggestion,
  removeSuggestions,
  handleUpdatePostContent,
}) => {
  const [show, setShow] = useState(false)
  const [loading, execute, error] = useAsync()
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const { token } = useAuth()

  const handleReplyResponse = (response) => {
    if (response) toastSuccess("Replied")
  }

  const handleRejectSuggestion = async (id) => {
    const response = await execute(patchSuggestion, token, id, {
      action: "reject",
    })
    if (response) {
      toast.warning("Rejected", {
        position: toast.POSITION.TOP_RIGHT,
      })
      removeSuggestions(id)
    } else if (error) toastError(error)
  }

  const handleReplacePostContent = (response) => {
    removeSuggestions(response.suggestion.id)
    handleUpdatePostContent(response.post.id, response.post.content)
    toastSuccess("Post content have changed")
  }

  return (
    <>
      <div className="card bg-dark border-bottom border-bottom-dark ms-3 rounded mt-2">
        <div className="m-0">
          <div className="d-flex text-warning suggest-header">
            {type === "from" ? (
              <p className="m-0">
                From{" "}
                <strong className="text-warning">
                  {suggestion.user["userName"]}{" "}
                </strong>{" "}
              </p>
            ) : (
              `To ${suggestion.user["userName"]} `
            )}
            {" on "}
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={handleShow}
              style={{ padding: "0.15rem 0.5rem", fontSize: "0.75rem" }}
            >
              Post
            </button>
          </div>
          <div className="p-1 card-body">
            <p
              id="suggestion-body"
              className="card-text bg-dark text-warning mb-1 post-content "
              dangerouslySetInnerHTML={createMarkup(suggestion.content)}
            />
          </div>
        </div>
        <div className="post-icons pt-1">
          {type === "from" ? (
            <>
              <UpdateItem
                itemName={"Reply"}
                handeAddItem={handleReplyResponse}
                itemOptions={{
                  requestBody: { action: "reply" },
                  url: `${process.env.REACT_APP_API_URL}/suggestions/${suggestion.id}/`,
                }}
              />
              <button
                className="btn btn-outline-warning btn-sm"
                onClick={() => handleRejectSuggestion(suggestion.id)}
              >
                {loading ? <Spinner /> : "Reject"}
              </button>
              <UpdateItem
                itemName={"Modify and Replace"}
                handeAddItem={handleReplacePostContent}
                content={suggestion.content}
                itemOptions={{
                  requestBody: {
                    suggestionId: suggestion.id,
                    action: "updateContent",
                  },
                  url: `${process.env.REACT_APP_API_URL}/posts/${suggestion.postId}/`,
                }}
              />
            </>
          ) : (
            suggestion.reply && (
              <p className="text-warning m-0">
                Reply:
                <span
                  dangerouslySetInnerHTML={createMarkup(suggestion.reply)}
                />
              </p>
            )
          )}
        </div>
      </div>
      {show && <PostModal handleClose={handleClose} post={suggestion.post} />}
    </>
  )
}
