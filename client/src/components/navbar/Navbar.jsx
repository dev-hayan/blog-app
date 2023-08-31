/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { useAuth } from "../../provider/authProvider"
export default function Navbar() {
  const { token, logout } = useAuth()
  return (
    <nav
      className="navbar bg-dark border-bottom border-bottom-dark"
      data-bs-theme="dark"
    >
      <div className="container-fluid screen-width">
        <div>
          <a className="navbar-brand me-2">Test Project</a>
          {token && (
            <>
              <Link
                to="/updateProfile"
                className="btn me-2 btn-outline-primary"
              >
                Profile
              </Link>
            </>
          )}
        </div>

        <div className="d-flex ">
          {!token ? (
            <>
              <Link
                type="button"
                to="/login"
                className="btn btn-outline-primary me-2"
              >
                Login
              </Link>
              <Link
                to="/signup"
                type="button"
                className="btn btn-outline-secondary"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button className={"btn me-2 btn-outline-primary"} onClick={logout}>
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
