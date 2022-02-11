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
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import Nav from "../components/Nav";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem/TodoItem";

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
    where("assignedTo", "array-contains", user.uid),
    orderBy("timestamp", "desc")
  );
  const q3 = query(collection(db, "users"));

  useEffect(() => {
    // snapshot ist ein listener
    let owned;
    let assigned;
    let unsubscribeAssigned = () => {};
    const unsubscribeTodos = onSnapshot(q, (snapshot) => {
      owned = snapshot.docs.map((doc) => ({
        id: doc.id,
        item: doc.data(),
      }));
      unsubscribeAssigned = onSnapshot(q2, (snapshot) => {
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
    const unsubscribeUsers = onSnapshot(q3, (snapshot) => {
      setAllUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          item: doc.data(),
        }))
      );
    });
    return () => {
      unsubscribeTodos();
      unsubscribeUsers();
      unsubscribeAssigned();
    };
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
        assignedTo: [],
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
        assignedTo: arrayUnion(newUserUid),
        ownerEmail: user.email,
      });
      setAssignNewUserMail("");
      console.log("addUser: " + assignNewUserMail);
      setUserExists("added user");
      console.log(userExists);
    };
    allUsers.forEach((item) => {
      if (item.item.email === assignNewUserMail) {
        console.log(assignNewUserMail + " doesn't exist");
        setUserExists(false);
        console.log(userExists);
      }
      if (assignNewUserMail === user.email) {
        console.log(assignNewUserMail + " is your account");
        setUserExists("this is your account");
        return;
      }
      if (
        item.item.email === assignNewUserMail &&
        assignNewUserMail !== user.email
      ) {
        const newUserUid = item.item.uid;
        assignUser(newUserUid);
        return;
      }
      console.log(assignNewUserMail + " doesn't exist");
      setUserExists("user doesn't exist");
      console.log(userExists);
    });
  };
  const removeUser = async (assignNewUserMail, id) => {
    const removeNewUser = async (newUserUid) => {
      const docRef = doc(db, "todos", id);
      await updateDoc(docRef, {
        assignedTo: arrayRemove(newUserUid),
      });
    };
    allUsers.forEach((item) => {
      if (item.item.email === assignNewUserMail) {
        const newUserUid = item.item.uid;
        removeNewUser(newUserUid);
      }
    });
    setAssignNewUserMail("");
    console.log("removeUser: " + assignNewUserMail);
  };
  const findEmail = (uid) => {
    const found = allUsers.find((user) => user.id === uid);
    const foundEmail = found.item.email;
    return foundEmail;
  };
  return (
    <>
      <div className="App">
        <Nav user={user} />
        <main>
          <TodoForm
            name={name}
            setName={setName}
            date={date}
            setDate={setDate}
            editMode={editMode}
            submit={submit}
            removeAll={removeAll}
          />
          <div>
            {list.map((item, key) => {
              return (
                <TodoItem
                  key={key}
                  item={item}
                  user={user}
                  userExists={userExists}
                  markAsDone={markAsDone}
                  addUser={addUser}
                  removeUser={removeUser}
                  editItem={editItem}
                  assignNewUserMail={assignNewUserMail}
                  setAssignNewUserMail={setAssignNewUserMail}
                  remove={remove}
                  findEmail={findEmail}
                />
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}
