import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

import LogoutButton from "../components/LogoutButton";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("user created: ", cred.user);
        console.log(auth.currentUser);
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("user logged in: ", cred.user);
        console.log(auth.currentUser);

        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    // Listener:
    onAuthStateChanged(auth, (user) => {
      console.log("user Status changed: ", user?.uid);
      setUser(user);
    });
  }, []);
  return (
    <>
      <div className="box">
        <form className="column">
          <h3>Sign Up</h3>
          <label htmlFor="email">email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={signup}>signup</button>
        </form>
        <form className="column">
          <h3>Login</h3>

          <label htmlFor="email">email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={login}>Login</button>
        </form>
        <LogoutButton />
      </div>
    </>
  );
}
