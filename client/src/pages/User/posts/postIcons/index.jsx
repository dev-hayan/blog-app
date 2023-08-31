/* eslint-disable react/prop-types */
import React from "react"
import LikeIcon from "../../../../components/icons/LikeIcon"
import ReportIcon from "../../../../components/icons/ReportIcon"
import { useAuth } from "../../../../provider/authProvider"
import patchSuggestion from "../../../../services/patchPost"

const LikeReport = ({ post }) => {
  const { user } = useAuth()
  return (
    <div className="post-icons text-warning pt-1 m-0">
      <LikeIcon
        likes_={post.likes}
        itemId={post.id}
        serivceMethod={patchSuggestion}
        data={{
          userId: user._id,
          typeId: post.id,
          type: "post",
          action: "like",
        }}
      />
      <ReportIcon
        reports_={post.reports}
        itemId={post.id}
        serivceMethod={patchSuggestion}
        data={{
          userId: user._id,
          typeId: post.id,
          type: "post",
          action: "report",
        }}
      />
    </div>
  )
}

export default LikeReport
