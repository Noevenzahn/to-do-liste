import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registeredUser, setRegisteredUser] = useState(false);

  const signup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        // console.log("user created: ", cred.user);;
        setDoc(doc(db, "users", cred.user.uid), {
          uid: cred.user.uid,
          email: cred.user.email,
        });
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
        // console.log("user logged in: ", cred.user);

        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err.message);
      });
    //update user data in Firestore if it changed?
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
      <main>
        <div className="login__form">
          {registeredUser ? (
            <>
              <form className="column">
                <p>Sign Up</p>
                <label htmlFor="email">email:</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.replace(/\s+/g, ""))}
                />
                <label htmlFor="password">password:</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value.replace(/\s+/g, ""))
                  }
                />
                <button onClick={signup}>sign up</button>
                <button
                  className="signup"
                  onClick={(e) => {
                    e.preventDefault();
                    setRegisteredUser((state) => !state);
                    console.log(registeredUser);
                  }}>
                  login
                </button>
              </form>
            </>
          ) : (
            <>
              <form className="column">
                <p>Login</p>

                <label htmlFor="email">email:</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.replace(/\s+/g, ""))}
                />
                <label htmlFor="password">password:</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value.replace(/\s+/g, ""))
                  }
                />
                <button onClick={login}>Login</button>
                <button
                  className="signup"
                  onClick={(e) => {
                    e.preventDefault();
                    setRegisteredUser((state) => !state);
                    console.log(registeredUser);
                  }}>
                  sign up
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </>
  );
}
