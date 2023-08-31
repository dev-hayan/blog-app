import React, { useEffect, useState } from "react"
import useAsync from "../../../hooks/useAsync"
import { useAuth } from "../../../provider/authProvider"
import Spinner from "../../../components/spinner"
import getAllSuggestion from "../../../services/readAllSuggestion"
import { AdminSuggestion } from "./AdminSuggetion"

export default function AdminSuggestions() {
  const [suggestions, setSuggestions] = useState([])
  const [loading, execute] = useAsync()
  const { token } = useAuth()

  useEffect(() => {
    (async function () {
      const response = await execute(getAllSuggestion, token)
      if (response) {
        setSuggestions(response)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDeleteSuggestion = (id) => {
    let tempSuggestions = [...suggestions]
    tempSuggestions = tempSuggestions.filter((post) => post.id !== id)
    setSuggestions(tempSuggestions)
  }
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : suggestions.length > 0 ? (
        suggestions.map((suggestion) => (
          <AdminSuggestion
            key={suggestion.id}
            suggestion={suggestion}
            handleDeleteSuggestion={handleDeleteSuggestion}
          />
        ))
      ) : (
        <p className="text-warning">No posts to show</p>
      )}
    </div>
  )
}
