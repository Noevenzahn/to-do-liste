import { useEffect, useState } from "react";
import "./App.scss";

const getLocalStorage = () => {
  const list = localStorage.getItem("list");
  if (!list) return [];
  return JSON.parse(localStorage.getItem("list"));
};

function App() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const submit = (e) => {
    e.preventDefault();
    if (!name) return;
    if (name && editMode) {
      setList(
        list.map((item) => {
          if (item.id === editId) return { ...item, name };
          return item;
        })
      );
      setEditMode(false);
      setName("");
      setEditId("");
    } else {
      const newItem = {
        name,
        date,
        done: false,
        id: new Date().getTime().toString(),
      };
      setList([...list, newItem]);
      setName("");
    }
  };
  const remove = (id) => {
    setList(list.filter((item) => item.id !== id));
  };
  const removeAll = (e) => {
    e.preventDefault();
    setList([]);
  };
  const markAsDone = (id) => {
    const item = list.find((item) => item.id === id);
    item.done = !item.done;
    setList([...list]); // The correct way to update arrays in react state is to copy the array elements into a new array reference
  };
  const editItem = (id) => {
    const item = list.find((item) => item.id === id);
    setEditMode(true);
    setEditId(id);
    setName(item.name);
    setDate(item.date);
  };

  return (
    <>
      <div className="App">
        <form>
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
          <button onClick={submit}>
            {!editMode ? "Add To Do" : "Save Change"}
          </button>
          <button onClick={removeAll}>Clear List</button>
        </form>
      </div>
      <div>
        {list.map((item) => {
          const { name, id, done, date } = item;

          return (
            <div key={id}>
              <p style={done ? { textDecoration: "line-through" } : {}}>
                {name} / {date}
              </p>
              <button onClick={() => markAsDone(id)}>done</button>
              <button onClick={() => editItem(id)}>edit</button>
              <button onClick={() => remove(id)}>remove</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
