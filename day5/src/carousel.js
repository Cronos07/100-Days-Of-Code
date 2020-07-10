import React, { useState, useEffect } from "react";
import "./styles.css";

function Carousel() {
    const images = [
        "https://i.pinimg.com/originals/ba/72/9a/ba729a42c1afb405a455b5a98e2ef56b.jpg",
        "https://i.pinimg.com/originals/92/d6/7d/92d67dd8819457c485a66742f3c538fe.jpg",
        "https://i.pinimg.com/originals/30/cd/8f/30cd8fddbf97eda931d867ee3eee8eb8.jpg",
        "https://i.pinimg.com/originals/1d/5a/91/1d5a91a591814d1284118e8aa6d47eb4.jpg",
        "https://i.pinimg.com/originals/ed/12/50/ed1250dbc532c762a07dd1b79c1012f2.jpg",
    ];

    const [pointer, setPointer] = useState(0);

    useEffect(()=>{
        setInterval(()=>setPointer(pointer=>(pointer+1)%5),4000)
    },[])
    return (
        <div>
            <h1>CAROUSEL</h1>
            <div className="carousel">
                <img
                    src={`${images[pointer]}`}
                    alt="img"
                    style={{ width: "100%", height: "100%" }}
                />
                <div className="dots">
                    {images.map((_, index) => {
                        if (index === pointer)
                            return (
                                <div
                                    className="dot"
                                    style={{ backgroundColor: "#ffffff" }}
                                    onClick={() => setPointer(index)}
                                ></div>
                            );
                        else return <div className="dot" onClick={()=>setPointer(index)}></div>;
                    })}
                </div>
            </div>
        </div>
    );
}

export default Carousel;
