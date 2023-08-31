import React, { useEffect, useState } from "react"
import useAsync from "../../../hooks/useAsync"
import { useAuth } from "../../../provider/authProvider"
import Spinner from "../../../components/spinner"
import AdminPost from "./AdminPost"
import getAllPosts from "../../../services/readAllPosts"

export default function AdminPosts() {
  const [posts, setPosts] = useState([])
  const [loading, execute] = useAsync()
  const { token } = useAuth()

  useEffect(() => {
    (async function () {
      const response = await execute(getAllPosts, token)
      if (response) {
        setPosts(response)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const handleDeleteUser = (id) => {
    let tempPosts = [...posts]
    tempPosts = tempPosts.filter((post) => post.id !== id)
    setPosts(tempPosts)
  }
  const handleToggleRole = (id) => {
    let tempPost = [...posts]
    const index = tempPost.findIndex((post) => post.id === id)
    tempPost[index].isApproved = !tempPost[index].isApproved
    setPosts(tempPost)
  }
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <AdminPost
            key={post.id}
            post={post}
            handleDeleteUser={handleDeleteUser}
            handleToggleRole={handleToggleRole}
          />
        ))
      ) : (
        <p className="text-warning">No posts to show</p>
      )}
    </div>
  )
}
