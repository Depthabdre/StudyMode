import { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";
import { ArrowUp, ArrowDown } from "lucide-react";


export default function App() {
  const [isRun, setIsRun] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [quotes, setQuotes] = useState([]);  // Fixed spelling here
  const intervalId = useRef(null); // Store interval reference
  const TotalSessionMinute = useRef(0)
  const [isBreak,setBreak] = useState(false)
  const [isPause,setIsPause] = useState(false)
  const [mode, setMode] = useState("");


  let minutes = useRef(0);

  useEffect(() => {
    if (!isRun) return;

    if (isRun && !isPause) {
      intervalId.current = setInterval(() => {
        setTotalSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(intervalId.current);
     
    }

    // Cleanup function to avoid memory leaks
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [isRun,isPause]);

  useEffect(() => {
    if(!isRun) return;
    if (TotalSessionMinute.current >= 30 && !isBreak){
      minutes.current = 30 - Math.floor(totalSeconds/60);
      if (minutes.current == 0){
        TotalSessionMinute.current -= 30;
        setTotalSeconds(0)
        setBreak(true)
      }}
    else if (TotalSessionMinute.current < 30 && !isBreak){
      minutes.current = TotalSessionMinute.current - (Math.floor(totalSeconds/60))
      if (minutes.current == 0){
        setIsRun(false)
      }
    }
    else if (TotalSessionMinute.current >= 5 && !isBreak){
      minutes.current = 5 - Math.floor(totalSeconds/60);
      if (minutes.current == 0){
        TotalSessionMinute.current -= 5;
        setTotalSeconds(0)
        setBreak(false) }}
    else{
      minutes.current = TotalSessionMinute.current - Math.floor(totalSeconds/60);
      if (minutes.current == 0){
        TotalSessionMinute.current = 0;
        isRun(false);
        }}
    },[totalSeconds,isRun,isBreak]);

  function clickHandler() {
    setIsRun(prev => !prev);
  }
  function pauseHandler(){
    setIsPause(prevPause => !prevPause)
  }

  return (
    <main className="grid grid-cols-2 grid-rows-4 gap-4 w-[90vw] h-screen items-start justify-center  m-0 p-0">
      <Mode mode={mode} setMode={setMode} />
      {isRun ? <TimeStarter isPause = {isPause} pauseHandler={pauseHandler}  clickHandler={clickHandler} isRun={isRun} totalSeconds={totalSeconds}  minutes={ minutes.current} /> : <FocusSession TotalSessionMinute={TotalSessionMinute} setIsRun={setIsRun} mode={mode} />}
      
      <Quotes quotes={quotes} setQuotes={setQuotes} isRun={isRun} /> {/* Fixed prop name here */}
    </main>
  );
}






     

function Quotes({ quotes, setQuotes, isRun }) {
  const [newQuote, setNewQuote] = useState(""); // Fixed spelling

  // Handler to add a new quote
  function newQuoteHandler() {
    if (newQuote.trim()) { // Check for non-empty input
      setQuotes(prevQuotes => [...prevQuotes, newQuote]); // Use the functional form to get the latest quotes
      setNewQuote(""); // Clear the input field after adding the quote
    }
  }

  // Handler to update the input field value
  function onChangeHandler(e) {
    setNewQuote(e.target.value);
  }

  // Render the list of quotes
  const quoteRender = quotes.map((quote, index) => (
    <li 
      key={index} 
      className="bg-gradient-to-r from-blue-100 to-emerald-50 text-black px-4 py-3 rounded-lg shadow-md font-semibold text-lg italic transition-transform transform hover:scale-105"
    >
      {quote}
    </li>
  ));

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 rounded-lg shadow-md h-full row-span-2">
      {!isRun ? <><input 
        type="text" 
        value={newQuote} // Set value to the state to make it a controlled input
        onChange={onChangeHandler} 
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your quote..."
      />
      
      <button 
        onClick={newQuoteHandler} 
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all"
      >
        Add Quote
      </button> </> : ''}
      
    
      <div className="w-full text-center text-gray-700 font-medium">
        <ul className="space-y-3">
          {quoteRender}
        </ul>
      </div>
    </div>
  );
}


function Mode({mode, setMode}) {
  const [onEdit, setOnEdit] = useState(true);
  
  function editHandler() {
    setOnEdit(prev => !prev);
  }

  function onChangeHandler(e) {
    setMode(e.target.value);
  }

  return (
    <div className="col-span-2 flex flex-col items-center justify-center gap-2 p-4">
      {onEdit ? (
        <>
          <input
            type="text"
            placeholder="Enter The Mode..."
            value={mode}  // Ensures input retains value
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
          <p className="text-4xl font-extrabold text-gray-900">{mode || "No Mode Set"}</p>
          <button
            onClick={editHandler}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
}


function TimeStarter({ totalSeconds , minutes , pauseHandler , isPause }) {
  const [activeColors, setActiveColors] = useState(Array(24).fill(false));

  useEffect(() => {
    if (totalSeconds % 75 === 0) {
      let index = Math.floor(totalSeconds / 75) - 1;

      setActiveColors((prevActiveColors) =>
        prevActiveColors.map((color, i) => (i === index ? true : color))
      );
    }
  }, [totalSeconds]);

  const seconds = 60 -  totalSeconds % 60;

  return (
    <section className='grid grid-rows-10 grid-cols-1 justify-center items-start  shadow-lg bg-gray-800 text-white p-8 rounded-lg h-full row-span-2 '>
      <div className="row-span-9  aspect-square grid grid-cols-1 grid-rows-1 justify-center items-center shadow-md border-b-cyan-950 bg-gray-700 rounded-full h-full ">
        <CircularTicker activeColors={activeColors}>
          <p className="text-5xl font-extrabold font-mono tracking-wide ">
            {minutes - 1}:{String(seconds).padStart(2, '0')}
          </p>
        </CircularTicker>
      </div>

      <div className="flex justify-center items-center pt-3 ">
        { !isPause ? (
          <Pause onClick={pauseHandler} size={32} className="cursor-pointer hover:scale-110 transition-transform" />
        ) : (
          <Play onClick={pauseHandler} size={32} className="cursor-pointer hover:scale-110 transition-transform" />
        )}
      </div>
    </section>
  );
}

function CircularTicker({ children , activeColors }){

  return (
    <>
  <div className="relative  flex flex-col items-center justify-center ">

 
     
      <div
        className={`absolute ${activeColors[0] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(0deg) translateX(80px)"}}
        
      ></div>
      <div
        className={`absolute ${activeColors[1] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(15deg) translateX(80px)"}}
      ></div>
      <div
        className={`absolute ${activeColors[2] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(30deg) translateX(80px)"}}
      ></div>
      <div
        className={`absolute ${activeColors[3] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(45deg) translateX(80px)"}}
      ></div>
      <div
        className={`absolute ${activeColors[4] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(60deg) translateX(80px)"}}
      ></div>
      <div
        className={`absolute ${activeColors[5] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(75deg) translateX(80px)"}}
      ></div>
      <div
        className={`absolute ${activeColors[6] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(90deg) translateX(80px)"}}
      ></div>
       <div
        className={`absolute ${activeColors[7] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(105deg) translateX(80px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[8] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(120deg) translateX(80px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[9] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(135deg) translateX(80px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[10] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(150deg) translateX(80px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[11] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(165deg) translateX(80px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[12] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(180deg) translateX(80px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[13] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(195deg) translateX(80px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[14] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(210deg) translateX(80px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[15] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(225deg) translateX(80px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[16] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(240deg) translateX(80px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[17] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(255deg) translateX(80px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[18] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(270deg) translateX(80px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[19] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(285deg) translateX(80px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[20] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(300deg) translateX(80px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[21] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(315deg) translateX(80px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[22] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(330deg) translateX(80px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[23] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(345deg) translateX(80px)"
        }}
      ></div>
     

      { children }

    </div>
    </>
  );
}


function FocusSession({TotalSessionMinute,setIsRun,mode}){

  const [totalMinutes,setTotalMinutes] = useState(0)

  const breaks = Math.floor(totalMinutes / 35);

  function FocusSessionStarter(){
   
    if ( !mode )
      alert("Enter your Mode")
    else{
      TotalSessionMinute.current = totalMinutes;
    setIsRun(true);
    }
      
    
  }

  function decHandler(){
    if (totalMinutes >= 5)
      setTotalMinutes( totalMinutes - 5)

  }
  function incHandler(){
    setTotalMinutes( totalMinutes + 5)

  }
  function onChangeHandler(e){
    let totminutes = parseInt(e.target.value);
    setTotalMinutes(totminutes);


  }

return (
<section className='flex flex-col justify-start items-center  shadow-lg bg-gray-800 text-white p-8 rounded-lg h-full  row-span-2  gap-4'>
<div>
  <h1 className="font-extrabold from-stone-50">Get Ready to Focus</h1>
</div>
<div className="grid grid-rows-2 grid-cols-3  bg-gray-700 rounded-[7px] w-2/3 h-1/4  ">
  <div className="row-span-2 col-span-2 flex flex-col justify-between items-center border-l-neutral-300 border-r-2 pr-2">

  <input 
  type="text" 
  inputMode="numeric" 
  pattern="[0-9]*" 
  value = {totalMinutes}
  onChange={onChangeHandler}
  onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
  className="font-bold text-3xl w-2/3 h-3/7 m-auto text-center border border-transparent rounded-md outline-none transition duration-200 
             focus:border-blue-500 focus:ring-2 focus:ring-blue-300 
             hover:border-gray-400"
/>
    <span className="text-sm">mins</span>

  </div>
  <div className=" text-gray-800 text-3xl border-b-2 border-amber-100 pl-2">
      <ArrowUp onClick={incHandler} className="cursor-pointer hover:text-blue-500 transition-transform hover:scale-110 " />
     
     
  </div>
  <div className=" text-gray-800 text-3xl  border-amber-100 pl-2">
  <ArrowDown onClick={decHandler} className="cursor-pointer hover:text-gray-950 transition-transform hover:scale-110" />
  </div>
  
</div>

<div>
  <p className="text-emerald-50 font-semibold ">you'll have {breaks} breaks </p>
</div>

<div className="bg-blue-700 rounded-md p-2 text-blue-50 font-bold hover:scale-110 transition-transform duration-500 ease-linear">
  <button className="inline-flex gap-2" onClick={FocusSessionStarter} >  
    <Play className="cursor-pointer  hover:scale-110 transition-transform" />
    Start Focus Session</button>
</div>

</section>
);

}









 