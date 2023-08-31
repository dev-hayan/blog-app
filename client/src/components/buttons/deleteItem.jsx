/* eslint-disable react/prop-types */
import React from "react"
import { useAuth } from "../../provider/authProvider"
import Spinner from "../spinner"
import useAsync from "../../hooks/useAsync"
import toastError from "../toast/error"
import toastSuccess from "../toast/success"

export default function DeleteItem({ apiActionMethod, uiActionMethod, id }) {
  const [loading, execute, error] = useAsync()
  const { token } = useAuth()

  const onDelete = async (id) => {
    const response = await execute(apiActionMethod, token, id)
    if (response) {
      toastSuccess("Item Deleted")
      uiActionMethod(id)
    } else if (error) toastError(error)
  }

  return (
    <button
      className="btn btn-outline-danger btn-sm"
      onClick={() => onDelete(id)}
    >
      {loading ? <Spinner /> : "Delete"}
    </button>
  )
}
