import React,{useState} from "react";
import "./styles.css";


function Battery() {
    const colors = ["tomato","orange","mediumseagreen"];
    const[percent,setPercent] = useState(3);

    return (
        <div>
            <h1>BATTERY</h1>
            <div className="container">
                <div className="body">
                    {
                    [1,2,3].map((val,index)=>{
                        if(index < percent) return <div className="bar" key={index} style={{backgroundColor:`${colors[percent-1]}`}}></div>
                        return <div className="bar" key={index}></div>
                    })
                    }
                </div>
                <div className="head"></div>
            </div>
            <div className="group">
                <button className="low" onClick={()=>setPercent(1)}>LOW</button>
                <button className="medium" onClick={()=>setPercent(2)}>MEDIUM</button>
                <button className="full" onClick={()=>setPercent(3)}> FULL</button>
            </div>
        </div>
    );
}

export default Battery;
