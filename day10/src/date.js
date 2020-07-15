import React, { useState, useEffect } from "react";
import "./styles.css";

function Todo() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");
    const [error, setError] = useState(false);

    const add = () => {
        if (text !== "") {
            todos.push({ text, date: new Date() });
            localStorage.setItem("todos", JSON.stringify(todos));
            setTodos([...todos]);
            setText("");
            setError(false);
        } else setError(true);
    };

    useEffect(() => {
        const todos = localStorage.getItem("todos");
        if (todos) setTodos(JSON.parse(todos));
    }, []);

    const remove = (id) => {
        todos.splice(id, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        setTodos([...todos]);
    };

    const formatDate = (str) => {
        const date = new Date(str);
        return `
        ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
          ${date.getHours() > 9 ? date.getHours() : "0" + date.getHours()}:${
            date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()
        }
        `;
    };

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
                        Please Enter Content of Todo
                    </div>
                )}
            </div>
            <div className="container">
                {todos.map((todo, index) => (
                    <div className="todo" key={index}>
                        {todo.text}
                        <div className="delete" onClick={() => remove(index)}>
                            x
                        </div>
                        <div className="date">{formatDate(todo.date)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Todo;
