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
        <img
          alt=""
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAABeCAYAAACq0qNuAAAABmJLR0QA/wD/AP+gvaeTAAABcUlEQVR4nO3aPU4CYRSF4XONO/Cnk5ZY0oB70cSlKRjXYmQHttr5s4ZjIYlGpwHn4wTmfcqvuHPzZiBTfBIAAAAAAAAAAAAAYFOVXmATtkvSTJKr6jG9z2DYvvO3eXqfQbA98l9n6b3WdZBeYANHHWfHW9/in3Yx/F4gfAjhQwgfQvgQwocQPoTwIYQPIXwI4UMIH0L4EMKHED6E8CGEDyF8COFDCB9y2Gqw7ZGkkwajxx1n57ZbvERvVfXcYG7/F5pWl40Wkq76nh2yqKrrvoe2CH8h6aHvuWGzqlr2ObDFz9MNZu6dFuGX+vqr2Re3fb/tUsNLq6trdacNRo8l3f86u5T01OBZr1X10mDu7rE96bg7OUnvtS6+40MIH0L4EMKHED6E8CGEDyF8COFDCB9C+BDChxA+hPAhhA8hfAjhQwgfQvgQwofsYviPjrP3rW8xRLbnP24Y3KT3GRTbU9vT9B4AAAAAAAAAAAAAgO37BElydcftIt94AAAAAElFTkSuQmCC"
        />
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
