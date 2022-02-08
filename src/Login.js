import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";

export default function Login({ user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("user created: ", cred.user);
        console.log(auth.currentUser);
        // setUser(auth.currentUser);
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
        // setUser(auth.currentUser);

        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const logout = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        console.log("user logged out");
        console.log(auth.currentUser);
        // setUser(auth.currentUser);
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
      // console.log("user Status changed: ", user);
      console.log("user Status changed: ", user.uid);
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
        <h3>Logout</h3>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
}
