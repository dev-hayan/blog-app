import React, { useEffect, useState } from "react"
import useAsync from "../../../hooks/useAsync"
import { useAuth } from "../../../provider/authProvider"
import { UserComponent } from "./UserComponent"
import getAllUsers from "../../../services/readAllUsers"
import Spinner from "../../../components/spinner"

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, execute] = useAsync()
  const { token } = useAuth()

  useEffect(() => {
    (async function () {
      const response = await execute(getAllUsers, token)
      if (response) {
        setUsers(response)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const handleDeleteUser = (id) => {
    let tempUsers = [...users]
    tempUsers = tempUsers.filter((user) => user.id !== id)
    setUsers(tempUsers)
  }
  const handleToggleRole = (id) => {
    let tempUsers = [...users]
    const index = tempUsers.findIndex((user) => user.id === id)
    tempUsers[index].isModerator = !tempUsers[index].isModerator
    setUsers(tempUsers)
  }

  return (
    <div>
      {loading ? <Spinner />
      : (
        <table className="table m-2 rounded">
          <thead className="">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          {users.length > 0 ? (
            <tbody>
              {users.map((user) => (
                <UserComponent
                  key={user.id}
                  user={user}
                  handleDeleteUser={handleDeleteUser}
                  handleToggleRole={handleToggleRole}
                />
              ))}
            </tbody>
          ) : (
            <p className="text-warning">No Users to show</p>
          )}
        </table>
      )}
    </div>
  )
}
