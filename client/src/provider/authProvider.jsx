/* eslint-disable react/prop-types */
import jwt_decode from "jwt-decode"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(token && jwt_decode(token))

  const setToken = (newToken) => {
    setToken_(newToken)
    setUser(jwt_decode(newToken))
  }

  const logout = () => {
    setToken_(null)
    setUser(null)
  }

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token)
      setUser(jwt_decode(token))
    } else {
      localStorage.removeItem("token")
      setUser(null)
    }
  }, [token])

  const contextValue = useMemo(
    () => ({
      token,
      user,
      setToken,
      logout,
    }),
    [token, user]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider
