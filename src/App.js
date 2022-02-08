import { useEffect, useState } from "react";
import "./App.scss";
import { db } from "./firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  where,
} from "firebase/firestore";
import Login from "./Login";

function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [list, setList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const CollectionRef = collection(db, "todos");

  // todo component
  const q = query(
    collection(db, "todos"),
    where("owner", "==", "7WOi6VO6TZPdWBoAp3wuQV9mrsh1"), //7WOi6VO6TZPdWBoAp3wuQV9mrsh1 user.uid
    orderBy("timestamp", "desc")
  );

  useEffect(() => {
    // snapshot ist ein listener
    onSnapshot(q, (snapshot) => {
      setList(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          item: doc.data(),
        }))
      );
    });
  }, [q]);

  const submit = (e) => {
    e.preventDefault();
    if (!name) return;
    if (name && editMode) {
      const docRef = doc(db, "todos", editId);
      setDoc(
        docRef,
        {
          todo: name,
          date,
        },
        { merge: true }
      );
      setEditMode(false);
      setName("");
      setEditId("");
    } else {
      addDoc(CollectionRef, {
        todo: name,
        date: date,
        done: false,
        owner: user.uid,
        timestamp: serverTimestamp(),
      });
      setName("");
    }
  };
  const remove = async (id) => {
    const todosDoc = doc(db, "todos", id);
    await deleteDoc(todosDoc);
    console.log(user.uid);
  };
  const removeAll = (e) => {
    e.preventDefault();
    list.forEach((item) => {
      const docRef = doc(db, "todos", item.id);
      deleteDoc(docRef);
      console.log(user.uid);
    });
    setList([]);
  };
  const markAsDone = async (id) => {
    const index = list.findIndex((item) => item.id === id);
    let done = !list[index].item.done;
    const docRef = doc(db, "todos", id);
    await updateDoc(docRef, {
      done: done,
    });
  };
  const editItem = (id) => {
    const index = list.findIndex((item) => item.id === id);
    setEditMode(true);
    setEditId(id);
    setName(list[index].item.todo);
    setDate(list[index].item.date);
  };

  return (
    <>
      <Login user={user} setUser={setUser} />
      {user ? (
        <>
          <div className="App">
            <form className="box">
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
              const { id } = item;
              const { done, todo, date } = item.item;
              return (
                <div className="box" key={id}>
                  <p className={done ? "doneState" : ""}>
                    {todo} / {date}
                  </p>
                  <button onClick={() => markAsDone(id)}>done</button>
                  <button onClick={() => editItem(id)}>edit</button>
                  <button onClick={() => remove(id)}>remove</button>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
