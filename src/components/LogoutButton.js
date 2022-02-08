import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function LogoutButton() {
  const logout = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        console.log("user logged out");
        console.log(auth.currentUser);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <button onClick={logout}>Logout</button>
    </>
  );
}
