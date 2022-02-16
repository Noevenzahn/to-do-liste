import { useState, useRef } from "react";
import "./Dropdown.scss";

import Toast from "../Toast/Toast";

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
  const toastRef = useRef(null);

  return (
    <>
      <button
        className="button--edit"
        onClick={() => setShowDrop((state) => !state)}>
        <img alt="" src="user.svg" />
      </button>
      {showDrop ? (
        <div className="dropdown">
          <Toast
            ref={toastRef}
            message={"Task Completed Successfully!"}
            type={"success"}
          />
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
                  // toast();
                  toastRef.current.show();
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
