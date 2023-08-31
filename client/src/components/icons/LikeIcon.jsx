/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { FaThumbsUp } from "react-icons/fa" // Import icons from react-icons
import useAsync from "../../hooks/useAsync"
import { useAuth } from "../../provider/authProvider"
import toastError from "../toast/error"
import toastSuccess from "../toast/success"

export default function LikeIcon({ likes_, itemId, serivceMethod, data }) {
  const [likes, setLikes] = useState(likes_ > 0 && likes_)
  const [loading, execute, error] = useAsync()
  const { token } = useAuth()

  const handleLikePost = async () => {
    const response = await execute(serivceMethod, token, itemId, data)
    if (response) {
      toastSuccess("Liked")
      setLikes(response.likes)
    } else if (error) {
      toastError(error)
    }
  }

  return (
    <span className="icon" id="like-icon" onClick={handleLikePost}>
      <FaThumbsUp />
      <span className="ms-2">{loading ? "Loading" : likes}</span>
    </span>
  )
}
