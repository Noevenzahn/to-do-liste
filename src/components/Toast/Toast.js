import "./Toast.scss";

export default function Toast({ userExists }) {
  return (
    <div className="toast">
      <p>{userExists}</p>
    </div>
  );
}
