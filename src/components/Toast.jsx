import React from "react";
import "./toast.css";

function Toast({ message, show }) {
    return (
        <div className={`toast-notification${show ? " show" : ""}`}>{message}</div>
    );
}

export default Toast;
