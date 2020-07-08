import React, { useState } from "react";
import "./styles.css";

function Modal() {
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");
    return (
        <div>
            {show && (
                <div className="back" onClick={() => setShow(false)}>
                    <div className="modal">
                        <h2 style={{ textAlign: "center" }}>You said,</h2>
                        <div className="text">{text}</div>
                    </div>
                </div>
            )}
            <h1>Pop! Modal</h1>
            <div className="textbox">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button onClick={() => setShow(true)}>Pop</button>
            </div>
        </div>
    );
}

export default Modal;
