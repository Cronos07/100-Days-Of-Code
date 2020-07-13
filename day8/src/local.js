import React, { useState, useEffect } from "react";
import "./styles.css";

function Todo() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");
    const [error, setError] = useState(false);

    const add = () => {
        if (text !== "") {
            todos.push(text);
            localStorage.setItem("todos",JSON.stringify(todos));
            setTodos([...todos]);
            setText("");
            setError(false);
        } else setError(true);
    };


    useEffect(()=>{
        const todos = localStorage.getItem("todos");
        if(todos) setTodos(JSON.parse(todos))
    },[])


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
                        {todo}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Todo;
