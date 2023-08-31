/* eslint-disable react/prop-types */
import React from "react"
import { useAuth } from "../../provider/authProvider"
import Spinner from "../spinner"
import useAsync from "../../hooks/useAsync"
import toastSuccess from "../toast/success"
import toastError from "../toast/error"

export default function ChangeRole({
  flag,
  defaultText,
  alternateText,
  apiActionMethod,
  uiActionMethod,
  id,
  body = null,
}) {
  const [loading, execute, error] = useAsync()
  const { token } = useAuth()

  const onRoleToggle = async (id) => {
    const response = await execute(apiActionMethod, token, id, body)
    if (response) {
      toastSuccess("Role changed")
      uiActionMethod(id)
    } else if (error) {
      toastError(error)
    }
  }
  return (
    <button
      className="btn btn-outline-primary btn-sm"
      onClick={() => onRoleToggle(id)}
    >
      {loading ? <Spinner /> : flag ? defaultText : alternateText}
    </button>
  )
}
