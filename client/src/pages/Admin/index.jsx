import React, { useState } from "react"
import AdminPosts from "./posts"
import Users from "./users"
import AdminSuggestions from "./suggestions"
import adminContent from "../../utils/constants"

export default function Admin() {
  const [toShow, setToShow] = useState("users")

  const handleSetUsers = () => {
    setToShow(adminContent.users)
  }

  const handleSetPosts = () => {
    setToShow(adminContent.posts)
  }

  const handleSetSuggestions = () => {
    setToShow(adminContent.suggestions)
  }

  return (
    <div className="bg-black post-parent pb-5 mt-1 d-flex flex-column rounded">
      <div className="d-flex justify-content-between align-items-center ps-2 pe-2 rounded ">
        <div className="d-flex justify-content-between align-items-center ps-2 pe-2 rounded mt-2 ">
          <button
            className={`btn btn-${toShow === "users" ? "" : "outline-"}primary`}
            onClick={handleSetUsers}
          >
            Show Users
          </button>
          <button
            className={`btn btn-${toShow === "posts" ? "" : "outline-"}primary`}
            onClick={handleSetPosts}
          >
            All Posts
          </button>
          <button
            className={`btn btn-${
              toShow === "suggestions" ? "" : "outline-"
            }primary`}
            onClick={handleSetSuggestions}
          >
            All Suggestions
          </button>
        </div>
      </div>
      <div className=" post-section rounded m-auto">
        {toShow === "users" && <Users />}
        {toShow === "posts" && <AdminPosts />}
        {toShow === "suggestions" && <AdminSuggestions />}
      </div>
    </div>
  )
}
