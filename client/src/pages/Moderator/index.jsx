import React, { useEffect, useState } from "react"
import { useAuth } from "../../provider/authProvider"
import useAsync from "../../hooks/useAsync"
import getPendingPosts from "../../services/readPendingPosts"
import Spinner from "../../components/spinner"
import ModeratorPost from "./moderatorPosts"
import getReportedPosts from "../../services/readReprtedPosts"

export default function Moderator() {
  const { token } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, execute] = useAsync()
  const [postType, setPostType] = useState("pending")

  useEffect(() => {
    handleGetPendingPosts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRemovePost = (id) => {
    let tempPost = [...posts]
    tempPost = tempPost.filter((post) => post.id !== id)
    setPosts(tempPost)
  }

  const handleGetPendingPosts = async () => {
    setPostType("pending")
    const response = await execute(getPendingPosts, token)
    if (response) {
      setPosts(response)
    }
  }

  const handleGetReportedPosts = async () => {
    setPostType("reported")
    const response = await execute(getReportedPosts, token)
    if (response) {
      setPosts(response)
    }
  }

  return (
    <div className="bg-black post-parent pb-5 mt-1 d-flex flex-column rounded">
      {posts && (
        <div className="d-flex justify-content-between align-items-center ps-2 pe-2 rounded ">
          <div className="d-flex justify-content-between align-items-center ps-2 pe-2 rounded mt-2 ">
            <button
              className={`btn btn-${
                postType === "pending" ? "" : "outline-"
              }primary`}
              onClick={handleGetPendingPosts}
            >
              Pending Posts
            </button>
            <button
              className={`btn btn-${
                postType === "pending" ? "outline-" : ""
              }primary`}
              onClick={handleGetReportedPosts}
            >
              Reported Posts
            </button>
          </div>
        </div>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <div className=" post-section rounded m-auto">
          {posts.length>0 ? (
            posts.map((post) => (
              <ModeratorPost
                key={post.id}
                post={post}
                type={postType}
                handleRemovePost={handleRemovePost}
              />
            ))
          ) : (
            <p className="text-warning">No posts to show</p>
          )}
        </div>
      )}
    </div>
  )
}
