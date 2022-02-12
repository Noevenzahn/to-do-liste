import "./TodoItem.scss";
import Dropdown from "../Dropdown/Dropdown";
import { useState, useRef, useEffect } from "react";

export default function TodoItem({
  item,
  user,
  name,
  setName,
  markAsDone,
  addUser,
  userExists,
  removeUser,
  editItem,
  setEditMode,
  assignNewUserMail,
  setAssignNewUserMail,
  remove,
  findEmail,
  submit,
}) {
  const [edit, setEdit] = useState(false);
  const todoInput = useRef(null);

  const submitEdit = (e) => {
    submit(e);
    setEdit((state) => !state);
    todoInput.current.blur();
  };
  const { id } = item;
  const { done, todo, date, owner, ownerEmail, assignedTo } = item.item;
  return (
    <div className={done ? "doneState box box--todo" : "box box--todo"}>
      <div className="todo__group">
        <button
          className="button--done"
          onClick={() => markAsDone(id)}></button>
        {!edit ? (
          <form onSubmit={(e) => submitEdit(e)}>
            <input
              value={todo}
              ref={todoInput}
              onClick={(e) => {
                e.preventDefault();
                setEdit((state) => !state);
                setName(todo);
                setEditMode(true);
                todoInput.current.focus();
              }}
              readOnly
            />
          </form>
        ) : (
          <form onSubmit={(e) => submitEdit(e)}>
            <input
              value={name}
              ref={todoInput}
              onChange={(e) => {
                editItem(id);
                setName(e.target.value);
              }}
            />
          </form>
        )}
        <div className="box__buttons">
          <span className="date">{date}</span>
          <Dropdown
            user={user}
            item={item}
            id={id}
            addUser={addUser}
            removeUser={removeUser}
            userExists={userExists}
            editItem={editItem}
            setAssignNewUserMail={setAssignNewUserMail}
            assignNewUserMail={assignNewUserMail}
          />
          <button className="button--delete" onClick={() => remove(id)}>
            <img alt="" src="remove.svg" />
          </button>
        </div>
      </div>
      {assignedTo[0] ? (
        user.uid === owner ? (
          <span className="shared">
            shared with:&nbsp;
            {assignedTo.map((user) => {
              return <span key={user}>{findEmail(user)}</span>;
            })}
          </span>
        ) : (
          <span className="shared">
            shared from:&nbsp;
            <span>{ownerEmail}</span>
          </span>
        )
      ) : (
        ""
      )}
    </div>
  );
}
