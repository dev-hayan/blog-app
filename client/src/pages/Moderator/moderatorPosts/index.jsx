/* eslint-disable react/prop-types */

import React, { useState } from "react"
import PostModal from "../../../components/postModal"
import createMarkup from "../../../services/getSanitizedHtml"
import { useAuth } from "../../../provider/authProvider"
import useAsync from "../../../hooks/useAsync"
import deletePost from "../../../services/removePost"
import Spinner from "../../../components/spinner"
import patchSuggestion from "../../../services/patchPost"
import toastError from "../../../components/toast/error"
import toastSuccess from "../../../components/toast/success"

export default function ModeratorPost({ post, handleRemovePost, type }) {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const { token } = useAuth()

  const [loading, execute, error] = useAsync()

  const approvePost_ = async (id) => {
    const response = await execute(patchSuggestion, token, id, {
      action: "approve",
    })
    if (response) {
      toastSuccess("Post Approved")
      handleRemovePost(id)
    } else if (error) toastError(error)
  }

  const deletePost_ = async (id) => {
    const response = await execute(deletePost, token, id)
    if (response) {
      toastSuccess("Post Deleted")
      handleRemovePost(id)
    } else if (error) toastError(error)
  }

  return (
    <>
      <div className="card bg-dark border-bottom border-bottom-dark ms-3 rounded mb-4">
        <div className="m-0">
          <div className="post-header">
            <h5 className="card-header text-warning">{`${post.user.userName[0].toUpperCase()}${post.user.userName
              .slice(1)
              .toLowerCase()}`}</h5>
          </div>
          <div className="card-body" onClick={handleShow}>
            <p
              className="card-text bg-dark text-warning mb-2 post-content ms-4"
              dangerouslySetInnerHTML={createMarkup(post.content)}
            />
          </div>
        </div>
        {type === "pending" ? (
          <button
            className="btn btn-outline-warning"
            onClick={() => approvePost_(post.id)}
          >
            {loading ? <Spinner /> : "Approve"}
          </button>
        ) : (
          <button
            className="btn btn-outline-danger"
            onClick={() => deletePost_(post.id)}
          >
            {loading ? <Spinner /> : "Delete"}
          </button>
        )}
      </div>
      {show && <PostModal handleClose={handleClose} post={post} />}
    </>
  )
}
