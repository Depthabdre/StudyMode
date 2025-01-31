import {useState,useRef} from 'react'

export default function App(){
  const [start,setStart] = useState(null);
  const [now,setNow] = useState(null);
  let refid = useRef(null);

function startHandler(){
  setStart(Date.now());
  setNow(Date.now());
  clearInterval(refid);
  refid.current=setInterval(()=>{
    setNow(Date.now());
  },10);
}
function stopHandler(){
  clearInterval(refid.current);
}

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
    <button >
      {((now-start)/1000).toFixed(2)}
    </button>
    <button onClick={startHandler}>Start</button>
    <button onClick={stopHandler}>Stop</button>
    </div>
    </>
  )

  

}