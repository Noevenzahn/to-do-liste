import Dropdown from "./Dropdown";

export default function TodoItem({
  item,
  user,
  markAsDone,
  addUser,
  removeUser,
  editItem,
  assignNewUserMail,
  setAssignNewUserMail,
  remove,
  findEmail,
}) {
  const { id } = item;
  const { done, todo, date, owner, ownerEmail, assignedTo } = item.item;
  return (
    <div className={done ? "doneState box box--todo" : "box box--todo"}>
      <div className="todo__group">
        <button
          className="button--done"
          onClick={() => markAsDone(id)}></button>
        <p>{todo}</p>
        <div className="box__buttons">
          <span className="date">{date}</span>
          <Dropdown
            user={user}
            item={item}
            id={id}
            addUser={addUser}
            removeUser={removeUser}
            editItem={editItem}
            setAssignNewUserMail={setAssignNewUserMail}
            assignNewUserMail={assignNewUserMail}
          />
          <button className="button--delete" onClick={() => remove(id)}>
            <img
              alt=""
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAABfElEQVR4nO3bO27CUBQEUJQCsvLAelKgbCifXUwaFwgZMPb7GDhHcu3rGetJWNzNBgAAAAAAAAAAAOAxJdkmOST5Ha5Dkl3HeXYj82x7zVPd8IDnjj1KGMI/jsyzbz1LM8NbNuYryXvDObZJPi/M8tdqjuauFNCshBvhJ8l37Rm6SbK/8uBJ5eMol4+dUx+17t/dxACqlNDz3quS20dAUvg46nHPVWsZiPAvaBGM8G+oGZDwJ6oRlPDvVDIw4c9UIjjhL7QkQOEXMidI4Rd2T6DCryTTPx34vFDLxLfbm1/TghKEX8qMEoRf2h0lPFT4b70H4AE4gjqaEb4SSlkQvhKWih9i/Ux8832KqGFOoEooZEmQSlioRIBKmKlkcEq4U43AlDBRzaCUcEOLgJRwQctglHCmRyBKGMTf0/vK+I5YswAmlvCSO2LJelaUXnJHbE1Lei+3I7a2NdWn3hHbDiX8DNe+R/gn8+xG5nneRW0AAAAAAAAAAADg2f0DN4io/jimluoAAAAASUVORK5CYII="
            />
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
