import { useState, useEffect,useRef } from 'react';
import { Play, Pause } from "lucide-react";

export default function App() {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRun , setIsRun] = useState(false);
  let intervalId = useRef();
  const [quotes,setQoutes] = useState([])

  useEffect(() => {

    if ( isRun ){
    intervalId.current = setInterval(() => {
      setTotalSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);
  }

 
    return () => clearInterval(intervalId.current);
  

    
  }, [isRun]); // it mounts again if the value of is_run changes

  function clickHandeler(){
    if (isRun){
      setIsRun(false);
    }
    else{
      setIsRun(true);
    }

  }

 
  return (
   
     <>
     <main className='grid grid-cols-2 grid-rows-2 gap-4 place-items-center'>
        <Mode />
     
    
    
      
          <TimeStarter clickHandeler={clickHandeler} isRun={isRun} totalSeconds={totalSeconds} />
       
          <Qoutes quotes={quotes} setQoutes={setQoutes} />
        
          </main>
      </>
  
  );
}

 function TimeStarter({clickHandeler,isRun,totalSeconds}){

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return(
    <section className='flex flex-col justify-center items-center  bg-gray-100'>
  <section className='flex flex-col justify-center items-center gap-6 shadow-lg w-full max-w-md bg-gray-800 text-white p-8 rounded-lg'>
    <div className="flex flex-col justify-center items-center">
      <div className='bg-gray-900  rounded-full flex flex-col justify-center items-center p-4'>
        <p className='text-5xl font-extrabold font-mono tracking-wide'>
          {minutes}:{String(seconds).padStart(2, '0')}
        </p>
      </div>
    </div>
    <div className="flex justify-center items-center gap-6">
      {isRun ? (
        <Pause onClick={clickHandeler} size={32} className="cursor-pointer hover:scale-110 transition-transform" />
      ) : (
        <Play onClick={clickHandeler} size={32} className="cursor-pointer hover:scale-110 transition-transform" />
      )}
    </div>
  </section>
</section>

  
  );

 }

     

function Qoutes({quotes,setQoutes}){
    const [newQoute,setNewQoute] = useState("")

    function newQouteHandler(){
    setQoutes([...quotes, newQoute])
    }
    function onChangeHandler(e){
    setNewQoute(e.target.value)
    }

    const quoteRender = quotes.map((quote, index) => (
      <li 
        key={index} 
        className="bg-gradient-to-r from-blue-100 to-emerald-50 text-black px-4 py-3 rounded-lg shadow-md font-semibold text-lg italic transition-transform transform hover:scale-105"
      >
        {quote}
      </li>
    ));
    

    return(

      <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 rounded-lg shadow-md ">
      <input 
        type="text" 
        onChange={onChangeHandler} 
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your quote..."
      />
      
      <button 
        onClick={newQouteHandler} 
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all"
      >
        Add Quote
      </button>
    
      <div className="w-full text-center text-gray-700 font-medium">
        <ul className="space-y-3">
          {quoteRender}
        </ul>
      </div>
    </div>
    
   
    );

}



function Mode(){
const [onEdit , setOnEdit] = useState(true)
const [mode , setMode] = useState("")

function editHandler(){
if(onEdit){
setOnEdit(false)
}
else{
setOnEdit(true)
}
}

function onChangeHandler(e){
  setMode(e.target.value)
}

return (
<div className="col-span-2 flex flex-col items-center justify-center space-y-4 p-4">
  {onEdit ? (
    <>
      <input
        type="text"
        placeholder="Enter The Mode..."
        onChange={onChangeHandler}
        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={editHandler}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        SET
      </button>
    </>
  ) : (
    <>
      <p className="text-4xl font-extrabold text-gray-900">{mode}</p>
      <button
        onClick={editHandler}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
      >
        Edit
      </button>
    </>
  )}
</div>


)



}








 