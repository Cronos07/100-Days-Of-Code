import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";
import { CSVLink } from "react-csv";

function Todo() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");
    const [error, setError] = useState(false);
    const [isasc, setAsc] = useState(true);
    const [term, setTerm] = useState("");
    const [result, setResult] = useState([]);

    const add = () => {
        if (text !== "") {
            todos.push({ text, date: new Date(), id: uuidv4() });
            localStorage.setItem("todos", JSON.stringify(todos));
            setTodos([...todos]);
            setText("");
            setError(false);
        } else setError(true);
    };

    useEffect(() => {
        const todos = localStorage.getItem("todos");
        if (todos)
            setTodos(
                JSON.parse(todos).sort(
                    (a, b) => new Date(a.date) - new Date(b.date)
                )
            );
    }, []);

    const remove = (id) => {
        const temp = todos.filter((todo) => todo.id !== id);
        const temp2 = result.filter((todo) => todo.id !== id);
        localStorage.setItem("todos", JSON.stringify(temp));
        setTodos([...temp]);
        setResult([...temp2]);
    };

    const sort = () => {
        setAsc((asc) => {
            if (asc) {
                const temp = todos.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );
                setTodos([...temp]);
            } else {
                const temp = todos.sort(
                    (a, b) => new Date(a.date) - new Date(b.date)
                );
                setTodos([...temp]);
            }
            return !asc;
        });
    };

    const formatDate = (str) => {
        const date = new Date(str);
        return `
        ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()},
          ${date.getHours() > 9 ? date.getHours() : "0" + date.getHours()}:${
            date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()
        }
        `;
    };

    const search = () => {
        if (term === "") setResult([]);
        else {
            const temp = todos.filter((todo) => todo.text.includes(term));
            setResult(temp);
        }
    };
    const headers = [
        { label: "date", key: "date" },
        { label: "todo", key: "todo" },
    ];
    const data = todos.map((todo) => ({
        date: formatDate(todo.date),
        todo: todo.text,
    }));
    return (
        <div>
            <CSVLink
                data={data}
                headers={headers}
                className="link"
                filename={"todo.csv"}
            >
                EXPORT AS CSV
            </CSVLink>

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
            <div className="search">
                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                />
                <button className="searchbtn" onClick={search}>
                    Search
                </button>
                <button className="sort" onClick={sort}>
                    Sort: Date({isasc ? "Ascending" : "Descending"})
                </button>
            </div>
            <div className="container">
                {result.length !== 0
                    ? result.map((todo) => (
                          <div className="todo" key={todo.id}>
                              {todo.text}
                              <div
                                  className="delete"
                                  onClick={() => remove(todo.id)}
                              >
                                  x
                              </div>
                              <div className="date">
                                  {formatDate(todo.date)}
                              </div>
                          </div>
                      ))
                    : todos.map((todo) => (
                          <div className="todo" key={todo.id}>
                              {todo.text}
                              <div
                                  className="delete"
                                  onClick={() => remove(todo.id)}
                              >
                                  x
                              </div>
                              <div className="date">
                                  {formatDate(todo.date)}
                              </div>
                          </div>
                      ))}
            </div>
        </div>
    );
}

export default Todo;
