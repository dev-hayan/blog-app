import React from "react"
import { useAuth } from "../../provider/authProvider"
import jwt_decode from "jwt-decode"
import Admin from "../Admin"
import Moderator from "../Moderator"
import User from "../User"

export default function Home() {
  const { token } = useAuth()
  const { isAdmin, isModerator } = jwt_decode(token)
  
  return isAdmin? <Admin /> : isModerator? <Moderator /> :  <User />
}
