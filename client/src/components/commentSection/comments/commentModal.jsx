/* eslint-disable react/prop-types */
import React from "react"
import createMarkup from "../../../services/getSanitizedHtml"

export default function CommentModal({ handleClose, comment }) {
  return (
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
              <h5 className="modal-title text-warning">Comment</h5>
              <button
                type="button"
                className="btn-close bg-light"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <p
                className="text-warning"
                dangerouslySetInnerHTML={createMarkup(comment.content)}
              ></p>
              <div className="image-container">
                {comment["attachments"].map((attachment) => (
                  <img
                    key={attachment.id}
                    src={attachment.url}
                    alt="Network Description"
                  />
                ))}
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  )
}
