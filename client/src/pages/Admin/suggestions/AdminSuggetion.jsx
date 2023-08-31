/* eslint-disable react/prop-types */
import React from "react"
import createMarkup from "../../../services/getSanitizedHtml"
import useAsync from "../../../hooks/useAsync"
import { useAuth } from "../../../provider/authProvider"
import Spinner from "../../../components/spinner"
import deleteSuggestion from "../../../services/removeSuggestion"
import toastError from "../../../components/toast/error"
import toastSuccess from "../../../components/toast/success"

export const AdminSuggestion = ({ suggestion, handleDeleteSuggestion }) => {
  const [loading, execute, error] = useAsync()
  const { token } = useAuth()

  const onDeletSuggestion = async (id) => {
    const response = await execute(deleteSuggestion, token, id)
    if (response) {
      toastSuccess("Suggestion Deleted")
      handleDeleteSuggestion(id)
    } else if (error) toastError(error)
  }

  return (
    <>
      <div className="card bg-dark border-bottom border-bottom-dark ms-3 rounded mt-2">
        <div className="m-0">
          <div className="post-header text-warning suggest-header">
            {`Suggestion`}
          </div>
          <div className="p-1 card-body">
            <p
              id="suggestion-body"
              className="card-text bg-dark text-warning mb-1 post-content "
              dangerouslySetInnerHTML={createMarkup(suggestion.content)}
            />
          </div>
        </div>
        <div className="post-icons pt-1">
          <button
            className="btn btn-outline-danger"
            onClick={() => onDeletSuggestion(suggestion.id)}
          >
            {loading ? <Spinner /> : "Delete"}
          </button>
        </div>
      </div>
    </>
  )
}
