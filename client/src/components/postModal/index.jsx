/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react"
import useAsync from "../../hooks/useAsync"
import Spinner from "../spinner"
import { useAuth } from "../../provider/authProvider"
import getAttachments from "../../services/readAttachments"
import "./style.css"
import CommentSecion from "../commentSection"
import createMarkup from "../../services/getSanitizedHtml"
import toastSuccess from "../toast/success"

export default function PostModal({ handleClose, post }) {
  const [attachments, setAttachments] = useState([])
  const [loading, execute] = useAsync()
  const [comments, setComments] = useState([])
  const { token } = useAuth()

  useEffect(() => {
    (async function () {
      const response = await execute(getAttachments, token, post.id, "post")
      if (response) {
        setAttachments(response)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const handleComments = async (response) => {
    setComments(response)
  }

  const handleAddComment = (response) => {
    toastSuccess("Commented")
    setComments((prev) => [...prev, response])
  }

  const handleDeleteComments = (id) => {
    let tempComments = [...comments]
    tempComments = tempComments.filter((comment) => comment.id !== id)
    setComments(tempComments)
  }
  return (
    <>
      <div
        className="modal"
        tabIndex="-1"
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog  bg-dark rounded" role="document">
          <div className="modal-content  bg-dark">
            <>
              <div className="modal-header bg-dark">
                <h5 className="modal-title text-warning">{post.userName}</h5>
                <button
                  type="button"
                  className="btn-close bg-light"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <div>
                  <p
                    className="text-warning"
                    dangerouslySetInnerHTML={createMarkup(post.content)}
                  />
                </div>
                {loading ? (
                  <Spinner />
                ) : (
                  <div className="image-container">
                    {attachments.length > 0 ? (
                      attachments.map((attachment) => (
                        <img
                          key={attachment.id}
                          src={attachment.url}
                          alt="Network Description"
                        />
                      ))
                    ) : (
                      <div className="text-warning replies no-comments">
                        No Attachmets
                      </div>
                    )}
                  </div>
                )}

                <CommentSecion
                  handleComments={handleComments}
                  postId={post.id}
                  handleAddComment={handleAddComment}
                  comments={comments}
                  handleDeleteComments={handleDeleteComments}
                />
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  )
}
