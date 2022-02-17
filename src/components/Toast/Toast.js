import { useState, forwardRef, useImperativeHandle } from "react";
import "./Toast.scss";

const Toast = forwardRef((props, ref) => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useImperativeHandle(ref, () => ({
    show(message, type) {
      setMessage(message);
      setType(type);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    },
  }));

  return (
    <div
      className="snackbar"
      id={showToast ? "show" : "hide"}
      style={{
        backgroundColor: type === "success" ? "#00F593" : "#FF0033",
        color: type === "success" ? "black" : "white",
      }}
    >
      <div className="symbol">
        {type === "success" ? <h1>&#x2713;</h1> : <h1>&#x2613;</h1>}
      </div>
      <div className="message">{message}</div>
    </div>
  );
});

export default Toast;