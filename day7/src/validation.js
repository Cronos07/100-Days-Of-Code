import React, { useState } from "react";
import "./styles.css";

function Todo() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");
    const [error, setError] = useState(false);

    const add = () => {
        if (text !== "") {
            todos.push(text);
            setTodos([...todos]);
            setText("");
            setError(false);
        } else setError(true);
    };

    console.log(todos);

    return (
        <div>
            <h1 className="heading">TODO</h1>
            <div className="textbox">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button className="add" onClick={add}>
                    Add
                </button>
                {error && (
                    <div style={{ color: "red" }}>
                        Please Enter Content of todo
                    </div>
                )}
            </div>
            <div className="container">
                {todos.map((todo, index) => (
                    <div className="todo" key={index}>
                        {todo}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Todo;
