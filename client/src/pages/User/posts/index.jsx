/* eslint-disable react/prop-types */
import React, { useState } from "react"
import PostModal from "../../../components/postModal"
import LikeReport from "./postIcons"
import createMarkup from "../../../services/getSanitizedHtml"
import { useAuth } from "../../../provider/authProvider"
import CreateItem from "../../../components/createItem"

export default function Post({ post, handleAddSuggestion }) {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const { user } = useAuth()

  return (
    <>
      <div className="card bg-dark border-bottom border-bottom-dark ms-3 rounded mb-4">
        <div className="m-0">
          <div className="post-header">
            <h5 className="card-header text-warning">{`${post.user.userName[0].toUpperCase()}${post[
              "user"
            ].userName
              .slice(1)
              .toLowerCase()}`}</h5>
            {post.userId !== user._id && (
              <CreateItem
                itemName={"Make Suggestion"}
                handeAddItem={handleAddSuggestion}
                type={"noFile"}
                itemOptions={{
                  requestBody: {
                    postId: post.id,
                    userId: user._id,
                  },
                  // eslint-disable-next-line no-undef
                  url: `${process.env.REACT_APP_API_URL}/suggestions/`,
                }}
              />
            )}
          </div>
          <div className="card-body" onClick={handleShow}>
            <p
              className="card-text bg-dark text-warning mb-2 post-content ms-4"
              dangerouslySetInnerHTML={createMarkup(post.content)}
            />
          </div>
        </div>
        <LikeReport post={post} />
      </div>
      {show && <PostModal handleClose={handleClose} post={post} />}
    </>
  )
}
