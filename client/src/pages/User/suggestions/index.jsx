/* eslint-disable react/prop-types */
import React, { useState } from "react"
import useAsync from "../../../hooks/useAsync"
import { useAuth } from "../../../provider/authProvider"
import Spinner from "../../../components/spinner"
import { Suggestion } from "./suggestion"
import toastError from "../../../components/toast/error"

export default function PostSuggestions({
  type,
  handleUpdatePostContent = null,
  getSuggestionMethod,
}) {
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [loading, execute, error] = useAsync()
  const { token, user } = useAuth()

  const handleSuggestion = async () => {
    setShowSuggestion(!showSuggestion)
    const response = await execute(getSuggestionMethod, token, user._id)
    if (response) setSuggestions(response)
    if (error) toastError(error)
  }

  const removeSuggestions = (id) => {
    let newSuggestions = [...suggestions]
    newSuggestions = newSuggestions.filter((suggestion) => suggestion.id !== id)
    setSuggestions(newSuggestions)
  }

  return (
    <div className="bg-black post-suggestion pb-5 mt-1 rounded">
      <div className="d-flex justify-content-between align-items-center ps-2 pe-2 rounded ">
        <button
          className="btn btn-outline-primary my-2"
          onClick={handleSuggestion}
        >
          {showSuggestion ? "Hide " : "Show "}
          {type === "from" ? "Post Suggestions" : "My Suggestions"}
        </button>
      </div>

      {showSuggestion && (
        <div className=" post-section rounded m-auto">
          {loading ? (
            <Spinner />
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <Suggestion
                key={suggestion.id}
                type={type}
                suggestion={suggestion}
                removeSuggestions={removeSuggestions}
                handleUpdatePostContent={handleUpdatePostContent}
              />
            ))
          ) : (
            <div className="ps-2 text-warning">No suggestions to show</div>
          )}
        </div>
      )}
    </div>
  )
}
