/* eslint-disable react/prop-types */
import changeModeratorRole from "../../../services/toggleModeratorRole"
import deleteUser from '../../../services/removeUser'
import ChangeRole from "../../../components/buttons/changeRole"
import DeleteItem from "../../../components/buttons/deleteItem"

export const UserComponent = ({ user, handleDeleteUser, handleToggleRole }) => (
  <tr className="user-component">
    <td>{user.firstName}</td>
    <td>{user.lastName}</td>
    <td>{user.email}</td>
    <td>
      <ChangeRole
        flag={user.isModerator}
        defaultText={"Remove Moderator"}
        alternateText={"Make Moderator"}
        apiActionMethod={changeModeratorRole}
        uiActionMethod={handleToggleRole}
        id={user.id}
      />
    </td>
    <td>
      <DeleteItem
        apiActionMethod={deleteUser}
        uiActionMethod={handleDeleteUser}
        id={user.id}
      />
    </td>
  </tr>
)
