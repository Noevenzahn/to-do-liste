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
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <button onClick={submit}>
            {!editMode ? "Add To Do" : "Save Change"}
          </button>
          <button onClick={removeAll}>Clear List</button>
        </div>
      </form>
    </>
  );
}
