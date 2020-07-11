import React, { useState } from 'react'
import axios from "axios";
import "./styles.css";

function Axios() {

    const [posts,setPosts] = useState([]);

    const fetch = ()=>{
        axios.get("https://jsonplaceholder.typicode.com/posts")
        .then((res)=>{
            setPosts(res.data);
        })
    }

    return (
        <div>
            <h1>AXIOS DEMO</h1>
            <button onClick={fetch}>FETCH</button>
            {
                posts.map(post=>(
                    <div>
                        <h2 style={{textAlign:"center"}}>{post.title}</h2>
                        <p style={{textAlign:"center"}}>{post.body}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Axios
