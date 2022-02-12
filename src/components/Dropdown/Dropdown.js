import { useState } from "react";
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
  const [showToast, setShowToast] = useState();

  const toast = () => {
    console.log(userExists);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
      <button
        className="button--edit"
        onClick={() => setShowDrop((state) => !state)}>
        <img alt="" src="user.svg" />
      </button>
      {showDrop ? (
        <div className="dropdown">
          {showToast ? <Toast toastMessage={userExists} /> : <></>}
          {/* <button className="button--edit" onClick={() => editItem(id)}>
            edit todo
          </button> */}
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
                  toast();
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
