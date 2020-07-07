import React, { useState, useRef } from "react";
import "./styles.css";

function Timer() {
    const interval = useRef();
    const [timer, setTimer] = useState(0);
    const [running, setRunning] = useState(false);

    const handleClick = () => {
        setRunning((running) => {
            if (running) clearInterval(interval.current);
            else {
                const duration = new Date() - timer;
                interval.current = setInterval(() =>
                    setTimer(new Date() - duration)
                );
            }
            return !running;
        });
    };

    const reset = () => {
        clearInterval(interval.current);
        setRunning(false);
        setTimer(0);
    };

    const formatTime = () => {
        const milliseconds = Math.floor(timer / 10) % 100;
        const seconds = Math.floor((timer / 1000) % 60);
        const minutes = Math.floor(timer / 1000 / 60);
        return `
    ${minutes <= 9 ? "0" + minutes : minutes}:${
            seconds <= 9 ? "0" + seconds : seconds
        }:${milliseconds <= 9 ? "0" + milliseconds : milliseconds}
    `;
    };

    return (
        <div>
              <h1>STOPWATCH</h1>
            <div className="time">{timer ? formatTime(timer) : "00:00:00"}</div>
            <div className="group">
                <button onClick={handleClick}>
                    {running ? "Stop" : "Start"}
                </button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default Timer;
