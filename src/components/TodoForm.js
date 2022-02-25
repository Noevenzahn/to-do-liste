import { getTodaysDate } from "../utilities/helpers";

export default function TodoForm({
  name,
  setName,
  date,
  setDate,
  editMode,
  submit,
  removeAll,
}) {
  return (
    <>
      <form className="box">
        <div className="input__group">
          {editMode ? (
            <input
              type="text"
              value={""}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="date"
            value={date ? date : getTodaysDate()}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <button onClick={submit}>Add To Do</button>
          <button onClick={removeAll}>Clear List</button>
        </div>
      </form>
    </>
  );
}
