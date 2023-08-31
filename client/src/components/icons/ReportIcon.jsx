/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { FaFlag } from "react-icons/fa" // Import icons from react-icons
import useAsync from "../../hooks/useAsync"
import { useAuth } from "../../provider/authProvider"
import toastError from "../toast/error"
import { toast } from "react-toastify"

export default function ReportIcon({ reports_, itemId, serivceMethod, data }) {
  const [reports, setReports] = useState(reports_ > 0 && reports_)
  const [loading, execute, error] = useAsync()
  const { token } = useAuth()

  const handleReportPost = async () => {
    const response = await execute(serivceMethod, token, itemId, data)
    if (response) {
      toast.warning("Reported", {
        position: toast.POSITION.TOP_RIGHT,
      })
      setReports(response.reports)
    } else if (error) {
      toastError(error)
    }
  }

  return (
    <span className="icon" id="report-icon" onClick={handleReportPost}>
      <FaFlag /> <span className="ms-2">{loading ? "Loading" : reports}</span>
    </span>
  )
}
