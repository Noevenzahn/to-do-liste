import { useState } from "react";
import "./App.scss";
import Login from "./pages/Login";
import Todo from "./pages/Todo";

function App() {
  const [user, setUser] = useState(null);

  return <>{user ? <Todo user={user} /> : <Login setUser={setUser} />}</>;
}

export default App;
