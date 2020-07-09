import React, { useRef, useState } from "react";
import "./styles.css";

function Loader() {
    const interval = useRef();
    const [count, setCount] = useState(0);

    const load = () => {
        interval.current = setInterval(() => {
            setCount((count) => {
                if (count < 100) return count + 1;
                else {
                    clear();
                    return 0;
                }
            });
        }, 200);
    };

    const clear = () => {
        clearInterval(interval.current);
    };

    return (
        <div>
            <h1>LOADER</h1>
            <div className="loader">
                <div className="loaded" style={{ width: `${count}%` }}>
                    {count !== 0 ? count + "%" : ""}
                </div>
            </div>
            <button onClick={load} disabled={count}>Load</button>
        </div>
    );
}

export default Loader;
