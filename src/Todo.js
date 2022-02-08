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

import Nav from "./Nav";

export default function Todo({ user }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [list, setList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const CollectionRef = collection(db, "todos");

  const q = query(
    collection(db, "todos"),
    where("owner", "==", user.uid),
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
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!name) return;
    if (name && editMode) {
      const docRef = doc(db, "todos", editId);
      updateDoc(docRef, {
        todo: name,
        date,
      });
      setEditMode(false);
      setName("");
      setEditId("");
      console.log("edit doc");
    } else {
      addDoc(CollectionRef, {
        todo: name,
        date: date,
        done: false,
        owner: user.uid,
        timestamp: serverTimestamp(),
      });
      setName("");
      console.log("add doc");
    }
  };
  const remove = async (id) => {
    const todosDoc = doc(db, "todos", id);
    await deleteDoc(todosDoc);
    console.log("remove doc");
  };
  const removeAll = (e) => {
    e.preventDefault();
    list.forEach((item) => {
      const docRef = doc(db, "todos", item.id);
      deleteDoc(docRef);
    });
    console.log("remove all docs");
  };
  const markAsDone = async (id) => {
    const index = list.findIndex((item) => item.id === id);
    let done = !list[index].item.done;
    const docRef = doc(db, "todos", id);
    await updateDoc(docRef, {
      done,
    });
    console.log("mark as done");
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
      <div className="App">
        <Nav />
        <main>
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

          <div>
            {list.map((item) => {
              const { id } = item;
              const { done, todo, date } = item.item;
              return (
                <div
                  className={done ? "doneState box box--todo" : "box box--todo"}
                  key={id}>
                  <button
                    className="button--done"
                    onClick={() => markAsDone(id)}></button>
                  <p>{todo}</p>
                  <div className="box__buttons">
                    <span className="date">{date}</span>
                    <button onClick={() => editItem(id)}>edit</button>
                    <button
                      className="button--delete"
                      onClick={() => remove(id)}>
                      remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}
