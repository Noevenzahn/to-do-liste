import "./Nav.scss";

import LogoutButton from "../LogoutButton";

export default function Nav({ user }) {
  return (
    <nav>
      <p className="date">{user.email}</p>
      <LogoutButton />
    </nav>
  );
}
