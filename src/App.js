import { useState } from "react";
import "./App.scss";
import Login from "./Login";
import Todo from "./Todo";

function App() {
  const [user, setUser] = useState(null);

  return <>{user ? <Todo user={user} /> : <Login setUser={setUser} />}</>;
}

export default App;
