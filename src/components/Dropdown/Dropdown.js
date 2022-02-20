import { useState } from "react";
import "./Dropdown.scss";

import { ReactComponent as UserIcon } from "../../assets/user.svg";



export default function Dropdown({
  user,
  item,
  id,
  editItem,
  userExists,
  addUser,
  removeUser,
  assignNewUserMail,
  setAssignNewUserMail,
}) {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <>
      <button
        className="button--edit"
        onClick={() => setShowDrop((state) => !state)}>
        <UserIcon className="icon" />
      </button>
      {showDrop ? (
        <div className="dropdown">
          {user.uid === item.item.owner ? (
            <>
              <input
                placeholder="type in email"
                value={assignNewUserMail}
                onChange={(e) =>
                  setAssignNewUserMail(e.target.value.replace(/\s+/g, ""))
                }
              />
              <button
                onClick={() => {
                  addUser(assignNewUserMail, id);
                }}>
                add
              </button>
              <button onClick={() => removeUser(assignNewUserMail, id)}>
                undo
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
