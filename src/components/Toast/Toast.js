import "./Toast.scss";

export default function Toast({ toastMessage }) {
  return (
    <div className="toast">
      <p>{toastMessage}</p>
    </div>
  );
}
