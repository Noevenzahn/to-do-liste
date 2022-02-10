import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  where,
  deleteField,
} from "firebase/firestore";

import Nav from "../components/Nav";
import Dropdown from "../components/Dropdown";

export default function Todo({ user }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [list, setList] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const [assignNewUserMail, setAssignNewUserMail] = useState("");
  const [userExists, setUserExists] = useState();

  const CollectionRef = collection(db, "todos");

  const q = query(
    collection(db, "todos"),
    where("owner", "==", user.uid),
    orderBy("timestamp", "desc")
  );
  const q2 = query(
    collection(db, "todos"),
    where("assignedTo", "==", user.uid),
    orderBy("timestamp", "desc")
  );
  const q3 = query(collection(db, "users"));

  useEffect(() => {
    // snapshot ist ein listener
    let owned;
    let assigned;
    onSnapshot(q, (snapshot) => {
      owned = snapshot.docs.map((doc) => ({
        id: doc.id,
        item: doc.data(),
      }));
      onSnapshot(q2, (snapshot) => {
        assigned = snapshot.docs.map((doc) => ({
          id: doc.id,
          item: doc.data(),
        }));
        let all = owned.concat(assigned);
        const set = new Set(all);
        all = Array.from(set);
        setList(all);
      });
    });
    onSnapshot(q3, (snapshot) => {
      setAllUsers(
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
      setDate("");
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
  const addUser = async (assignNewUserMail, id) => {
    const assignUser = async (newUserUid) => {
      const docRef = doc(db, "todos", id);
      await updateDoc(docRef, {
        assignedTo: newUserUid,
        ownerEmail: user.email,
      });
      console.log("addUser: " + assignNewUserMail);
      setUserExists(true);
      console.log(userExists);
    };
    allUsers.forEach((item) => {
      if (
        item.item.email === assignNewUserMail &&
        assignNewUserMail !== user.email
      ) {
        const newUserUid = item.item.uid;
        assignUser(newUserUid);
      } else if (assignNewUserMail === user.email) {
        console.log(assignNewUserMail + " is your account");
        return;
      } else {
        setUserExists(false);
        console.log(userExists);
        console.log(assignNewUserMail + " doesn't exist");
      }
    });
  };
  const removeUser = async (id) => {
    const docRef = doc(db, "todos", id);
    await updateDoc(docRef, {
      assignedTo: deleteField(),
    });
    setAssignNewUserMail("");
    console.log("removeUser: " + assignNewUserMail);
  };

  return (
    <>
      <div className="App">
        <Nav user={user} />
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
              const { done, todo, date, owner, ownerEmail, assignedTo } =
                item.item;
              return (
                <div
                  className={done ? "doneState box box--todo" : "box box--todo"}
                  key={id}>
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
                      <button
                        className="button--delete"
                        onClick={() => remove(id)}>
                        r
                      </button>
                    </div>
                  </div>
                  {assignedTo ? (
                    user.uid === owner ? (
                      <span className="shared">shared with: {assignedTo}</span>
                    ) : (
                      <span className="shared">shared from: {ownerEmail}</span>
                    )
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}
