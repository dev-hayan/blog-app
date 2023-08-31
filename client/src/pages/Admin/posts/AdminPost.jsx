/* eslint-disable react/prop-types */

import React, { useState } from "react"
import PostModal from "../../../components/postModal"
import createMarkup from "../../../services/getSanitizedHtml"
import ChangeRole from "../../../components/buttons/changeRole"
import DeleteItem from "../../../components/buttons/deleteItem"
import deletePost from "../../../services/removePost"
import patchSuggestion from "../../../services/patchPost"

export default function AdminPost({
  post,
  handleDeleteUser,
  handleToggleRole,
}) {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

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
        <div className="d-flex justify-content-between">
          <ChangeRole
            flag={post.isApproved}
            defaultText={"Reject"}
            alternateText={"Approve"}
            apiActionMethod={patchSuggestion}
            uiActionMethod={handleToggleRole}
            id={post.id}
            body={{ action: "toggelStatus" }}
          />
          <DeleteItem
            apiActionMethod={deletePost}
            uiActionMethod={handleDeleteUser}
            id={post.id}
          />
        </div>
      </div>
      {show && <PostModal handleClose={handleClose} post={post} />}
    </>
  )
}
