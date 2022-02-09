import { useState } from "react";

export default function Dropdown({
  user,
  item,
  id,
  addUser,
  editItem,
  assignNewUserMail,
  setAssignNewUserMail,
}) {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <>
      <button
        className="button--edit"
        onClick={() => setShowDrop((state) => !state)}>
        !
      </button>
      {showDrop ? (
        <div className="dropdown">
          {/* <button className="button--edit" onClick={() => editItem(id)}>
            !
          </button> */}
          {user.uid === item.item.owner ? (
            <>
              <input
                placeholder="add user via email"
                value={assignNewUserMail}
                onChange={(e) => setAssignNewUserMail(e.target.value)}
              />
              <button
                className="button--edit"
                onClick={() => addUser(assignNewUserMail, id)}>
                +
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
