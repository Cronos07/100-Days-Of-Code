import React,{useState,useEffect} from 'react';
import shuffle from 'shuffle-array';
import "./styles.css";

const WIDTH = 1200;
const HEIGHT = 500;


function Bar(props){
  let height = props.height * (HEIGHT/props.count);
  return(
    <div style={{display:"inline-block",width:`${props.width}px`,height:`${height}px`,backgroundColor:`${props.color}`,marginLeft:"2px"}}>
    </div>
  );
}

function App() {
  const [count,changeCount] = useState(0);
  const [bars,changeBars] = useState([]);
  const [current,changeCurrent] = useState([0,0]);
  const [running,changeRunning] = useState(false);
  
  let width = (WIDTH/count) -2;

  useEffect(()=>{
    let temp = [];
    for(let i=1;i<=count;i++)temp.push(i);
    shuffle(temp);
    changeRunning(false);
    changeCurrent([0,0]);
    changeBars(temp);
  },[count]);

  useEffect(()=>{
  setTimeout(()=>{
  if(running){
    if(current[0] < count){
      if(current[1]<count-1){
        if(bars[current[1]] > bars[current[1]+1]){
          [bars[current[1]] , bars[current[1]+1]] = [bars[current[1]+1] , bars[current[1]]]
          changeBars(bars);
        }
        changeCurrent([current[0],current[1]+1])
      }
      else changeCurrent([current[0]+1,0])
    }else changeRunning(false)
  }
})},[running,count,current,bars]);

  return (
    <>
    <header style={{textAlign:"center"}}>
      <h1>BUBBLE SORT VISUALIZER</h1>
      <button onClick={()=>changeRunning(true)}>START</button>
      {running?
      <input type="range" min="0" max="200" step="1" value={count} onChange={(e)=>changeCount(e.target.value)} disabled style={{margin:"0 10px"}}/>
      :<input type="range" min="0" max="200" step="1" value={count} onChange={(e)=>changeCount(e.target.value)} style={{margin:"0 10px"}}/>
      }
      <span className="count">COUNT:{count}</span>
      <button onClick={()=>changeRunning(false)}>STOP</button>
    </header>
    <main  style={{width:`${WIDTH}px`,height:`${HEIGHT}px`,border:"3px solid red",margin:"40px auto"}}>
    {
      bars.map((height,index)=>{
        return <Bar 
        height={height} 
        width={width} 
        count={count} 
        color={index === current[1] || index === current[1]+1 ? "crimson" : "DodgerBlue"}
        key={height}
        />
      })
    }
    </main>
    </>
  );
}

export default App;
