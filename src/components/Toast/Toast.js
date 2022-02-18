import { useState, forwardRef, useImperativeHandle } from "react";
import "./Toast.scss";

const Toast = forwardRef((props, ref) => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useImperativeHandle(ref, () => ({
    show(message, type) {
      if(!showToast) {
        setMessage(message);
        setType(type);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
      }
    },
  }));

  return (
    <div
      className={showToast ? "toast show" : "toast hide"}
      style={{
        backgroundColor: type === "success" ? "hsl(155, 40%, 20%)" : "hsl(340, 40%, 25%)",
      }}
    >
      {/* <div className="symbol">
        {type === "success" ? <h1>&#x2713;</h1> : <h1>&#x2613;</h1>}
      </div> */}
      <div className="message">{message}</div>
    </div>
  );
});

export default Toast;