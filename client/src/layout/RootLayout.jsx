/* eslint-disable react/prop-types */
import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar/Navbar"
export default function RootLayout() {
  return (
    <>
      <Navbar />
      <div className="main">
        <Outlet />
      </div>
    </>
  )
}
