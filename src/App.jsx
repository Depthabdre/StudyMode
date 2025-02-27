/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Learning from "./LearningPage";
import { useState, useEffect, useRef,useCallback } from "react";
import { Play, Pause } from "lucide-react";
import { ArrowUp, ArrowDown  } from "lucide-react";
import prequotes from "./Quote";


export default function App() {
  const [isRun, setIsRun] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [quotes, setQuotes] = useState(prequotes);  // Fixed spelling here
  const intervalId = useRef(null); // Store interval reference
  const TotalSessionMinute = useRef(30)
  const [isBreak,setBreak] = useState(false)
  const [isPause,setIsPause] = useState(false)
  const [mode, setMode] = useState("");
  let currentSessionMinute = useRef(30);
  let sessionBreakPoint = useRef([1,1]); // for enjoing session and  break respectively 
  const [isVisible, setIsVisible] = useState(false);
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

  const onClose = useCallback(() => {
    setIsVisible((prev) => !prev); // toggle visibility
  }, []);
  

  useEffect(() => {
    if (!isRun) return;
  
    if (TotalSessionMinute.current >= 30 && !isBreak) {
      minutes.current = 30 - Math.floor(totalSeconds / 60);
  
      if (minutes.current == 0) {
        TotalSessionMinute.current -= 30;
  
        if (TotalSessionMinute.current >= 5) 
          currentSessionMinute.current = 5;
        else 
          currentSessionMinute.current = TotalSessionMinute.current;
  
        onClose();
  
        const audio = new Audio("/Remainder.mp3");
        audio.play();
  
        setTimeout(() => {
          audio.play();
        }, 9000);
  
        setTimeout(() => {
          onClose();
        }, 18000);
  
        sessionBreakPoint.current[0] += 1;
        setTotalSeconds(0);
        setBreak(true);
      }
    } 
    else if (TotalSessionMinute.current < 30 && !isBreak) {
      minutes.current = TotalSessionMinute.current - Math.floor(totalSeconds / 60);
  
      if (minutes.current == 0) {
        onClose();
  
        const audio = new Audio("/Remainder.mp3");
        audio.play();
  
        setTimeout(() => {
          audio.play();
        }, 9000);
  
        setTimeout(() => {
          onClose();
        }, 18000);
  
        setIsRun(false);
      }
    } 
    else if (TotalSessionMinute.current >= 5 && isBreak) {
      minutes.current = 5 - Math.floor(totalSeconds / 60);
  
      if (minutes.current == 0) {
        TotalSessionMinute.current -= 5;
  
        if (TotalSessionMinute.current >= 30) 
          currentSessionMinute.current = 30;
        else 
          currentSessionMinute.current = TotalSessionMinute.current;
  
        onClose();
  
        const audio = new Audio("/Remainder.mp3");
        audio.play();
  
        setTimeout(() => {
          audio.play();
        }, 9000);
  
        setTimeout(() => {
          onClose();
        }, 18000);
  
        sessionBreakPoint.current[1] += 1;
        setTotalSeconds(0);
        setBreak(false);
      }
    } 
    else {
      minutes.current = TotalSessionMinute.current - Math.floor(totalSeconds / 60);
  
      if (minutes.current == 0) {
        TotalSessionMinute.current = 0;
  
        onClose();
  
        const audio = new Audio("/Remainder.mp3");
        audio.play();
  
        setTimeout(() => {
          audio.play();
        }, 9000);
  
        setTimeout(() => {
          onClose();
        }, 18000);
  
        setIsRun(false);
      }
    }
  }, [totalSeconds, isRun, isBreak, isVisible, onClose]);
  

  function clickHandler() {
    setTotalSeconds(0)
    setIsPause(false)
    setIsRun(prev => !prev);
  }
  function pauseHandler(){
    setIsPause(prevPause => !prevPause)
  }

 

  return (
    <Router>  {/* ✅ Wrap entire app with Router */}
      <>
       
        <Routes>
          <Route
            path="/"
            element={
              <>
               <FloatingButton />
              <main className="grid grid-rows-[auto_300px_auto] md:grid-rows-[auto_auto_auto] md:grid-cols-2 gap-4 w-[90vw] min-h-screen items-start justify-center p-0">
                <Mode isPause={isPause} mode={mode} setMode={setMode} />
                {isRun ? (
                  <TimeStarter
                    isPause={isPause}
                    TotalSessionMinute={TotalSessionMinute}
                    pauseHandler={pauseHandler}
                    sessionBreakPoint={sessionBreakPoint}
                    clickHandler={clickHandler}
                    isRun={isRun}
                    totalSeconds={totalSeconds}
                    minutes={minutes.current}
                    currentSessionMinute={currentSessionMinute}
                  />
                ) : (
                  <FocusSession
                    currentSessionMinute={currentSessionMinute}
                    TotalSessionMinute={TotalSessionMinute}
                    setIsRun={setIsRun}
                    mode={mode}
                  />
                )}
                <Quotes quotes={quotes} setQuotes={setQuotes} isRun={isRun} />
               
              </main>
              <Notification isVisible={isVisible} isBreak={isBreak} onClose={onClose} />
              </>
              
            }
          />
          <Route path="/LearningPage" element={<Learning />} /> 
        </Routes>
       
      </>
    </Router>
  );
}






     

function Quotes({ quotes, setQuotes, isRun }) {
  const [newQuote, setNewQuote] = useState(""); 

  
  function newQuoteHandler() {
    if (newQuote.trim()) { 
      setQuotes(prevQuotes => [...prevQuotes, newQuote]);
    }
  }

 
  function onChangeHandler(e) {
    setNewQuote(e.target.value);
  }
  function deleteHandler(index){
    setQuotes(quotes.filter(( quote, i ) => i != Number(index) ))
  }

  
  const quoteRender = quotes.map((quote, index) => (
    <li 
      key={index} 
      className="font-serif text-left shadow-sm pl-2 text-white font-bold text-lg transition-transform transform hover:scale-105 flex justify-between items-center"
    >
      {quote}
      {!isRun && (
        <button onClick = { () => deleteHandler(index) } className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition ">
          Delete
        </button>
      )}
    </li>
  ));
  

  return (
    <div className="flex flex-col items-center gap-6  bg-gray-800  rounded-2xl shadow-xl h-full p-6">
  {!isRun ? (
    <>
      <input
        type="text"
        value={newQuote} // Set value to the state to make it a controlled input
        onChange={onChangeHandler}
        className="w-full px-4 py-3 border border-gray-300 rounded-full bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
        placeholder="Enter your quote..."
      />
      <button
        onClick={newQuoteHandler}
        className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
      >
        Add Quote
      </button>
    </>
  ) : ''}
  <div className="w-full text-center text-gray-800 font-sans  ">
    <ul className="flex flex-col space-y-3 p-3">
      {quoteRender}
    </ul>
  </div>
</div>

  );
}


function Mode({mode, setMode,isPause}) {
  const [onEdit, setOnEdit] = useState(true);
  
  function editHandler() {
    setOnEdit(prev => !prev);
  }

  function onChangeHandler(e) {
    setMode(e.target.value);
  }

  return (
    <div className="  md:col-span-2 flex flex-col items-center justify-center gap-2 p-4">
      {onEdit ? (
        <>
          <input
            type="text"
            placeholder="Enter The Mode..."
            value={mode}  // Ensures input retains value
            onChange={onChangeHandler}
           className=" px-4 py-3 border border-gray-300 rounded-full bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
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
          <p className="text-4xl font-extrabold text-white">{mode || "No Mode Set"}</p>

          {isPause &&  <button
            onClick={editHandler}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
          >
            Edit
          </button>}
         
        </>
      )}
    </div>
  );
}


function TimeStarter({ totalSeconds , minutes , pauseHandler , isPause , clickHandler,currentSessionMinute ,sessionBreakPoint,TotalSessionMinute}) {
  const [activeColors, setActiveColors] = useState(Array(24).fill(false));


  
  useEffect(() => {
    let increment = ((currentSessionMinute.current * 60 )/ 24);
    let index = Math.floor((totalSeconds / increment) ) - 1;    
    

      setActiveColors((prevActiveColors) =>
        prevActiveColors.map((color, i) => (i === index ? true : color))
      );
    }
    
  , [totalSeconds,currentSessionMinute]);

  const seconds = 60 -  totalSeconds % 60;

  return (
    <section className='flex flex-col justify-center place-items-center shadow-lg bg-gray-800 text-white p-2 rounded-lg h-full '>
        {isPause ? (
   <p className="self-start   text-lg font-semibold px-4 py-2 rounded-lg ">
      Break {sessionBreakPoint.current[1]} of {Math.ceil(TotalSessionMinute.current / 35)}
    </p>
  ) : (
    <p className="self-start text-lg font-semibold px-4 py-2 rounded-lg ">
      Joy Session {sessionBreakPoint.current[0]} of {Math.ceil(TotalSessionMinute.current / 35)}
    </p>
  )}
     
        <CircularTicker activeColors={activeColors}>
          <p className="text-xl md:text-4xl font-extrabold font-mono tracking-wide ">
            {minutes - 1}:{String(seconds).padStart(2, '0')}
          </p>
        </CircularTicker>
     

      <div className="flex justify-center gap-4 items-center pt-5 row-span-2">
        { !isPause ? (
          <Pause onClick={pauseHandler} size={30} className="cursor-pointer hover:scale-110 transition-transform" />
        ) : (
          <Play onClick={pauseHandler} size={30} className="cursor-pointer hover:scale-110 transition-transform" />
        )}
        <button onClick={clickHandler} className="text-blue-200 font-bold border-2 rounded-lg w-14 bg-gray-700 hover:scale-105 hover:bg-gray-800 transition">Stop</button>
      </div>
    </section>
  );
}

function CircularTicker({ children , activeColors }){

  const parentRef = useRef(null);
  const [parentWidth, setParentWidth] = useState(0);

 
  useEffect(() => {
    const updateWidth = () => {
      if (parentRef.current) {
        setParentWidth(parentRef.current.getBoundingClientRect().width);
      }
    };

    
    updateWidth();

    
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  let precentWidth =  0.65 * (parentWidth/2);
  return (
    <>
  <div   ref={parentRef} className="relative aspect-square flex flex-col justify-center place-items-center shadow-md border-b-cyan-950 bg-gray-700 rounded-full h-full md:h-1/2 lg:h-3/4">
 
     
      <div
        className={`absolute ${activeColors[0] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: `rotate(0deg) translateX(${precentWidth}px)`
        }}
        
      ></div>
      <div
        className={`absolute ${activeColors[1] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform:  `rotate(15deg) translateX(${precentWidth}px)`}}
      ></div>
      <div
        className={`absolute ${activeColors[2] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform:`rotate(30deg) translateX(${precentWidth}px)`}}
      ></div>
      <div
        className={`absolute ${activeColors[3] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform:`rotate(45deg) translateX(${precentWidth}px)`}}
      ></div>
      <div
        className={`absolute ${activeColors[4] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform:`rotate(60deg) translateX(${precentWidth}px)`}}
      ></div>
      <div
        className={`absolute ${activeColors[5] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform:`rotate(75deg) translateX(${precentWidth}px)`}}
      ></div>
      <div
        className={`absolute ${activeColors[6] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform:`rotate(90deg) translateX(${precentWidth}px)`}}
      ></div>
       <div
        className={`absolute ${activeColors[7] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform:`rotate(105deg) translateX(${precentWidth}px)`
        }}
      ></div>
      <div
        className={`absolute ${activeColors[8] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform:`rotate(120deg) translateX(${precentWidth}px)`
        }}
      ></div>
      <div
        className={`absolute ${activeColors[9] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform:`rotate(135deg) translateX(${precentWidth}px)`
        }}
      ></div>
      <div
        className={`absolute ${activeColors[10] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform:`rotate(150deg) translateX(${precentWidth}px)`
        }}
      ></div>
      <div
        className={`absolute ${activeColors[11] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform:`rotate(165deg) translateX(${precentWidth}px)`
        }}
      ></div>
      <div
        className={`absolute ${activeColors[12] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform:`rotate(180deg) translateX(${precentWidth}px)`
        }}
      ></div>
      <div
        className={`absolute ${activeColors[13] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform:`rotate(195deg) translateX(${precentWidth}px)`
        }}
      ></div>
      <div
        className={`absolute ${activeColors[14] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform:`rotate(210deg) translateX(${precentWidth}px)`
        }}
      ></div>
      <div
        className={`absolute ${activeColors[15] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform:`rotate(225deg) translateX(${precentWidth}px)`
        }}
      ></div>
      <div
        className={`absolute ${activeColors[16] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform:`rotate(240deg) translateX(${precentWidth}px)`
        }}
      ></div>
      <div
        className={`absolute ${activeColors[17] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform:`rotate(255deg) translateX(${precentWidth}px)`
        }}
      ></div>
      <div
        className={`absolute ${activeColors[18] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform:`rotate(270deg) translateX(${precentWidth}px)`
        }}
      ></div>
      <div
        className={`absolute ${activeColors[19] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform:`rotate(285deg) translateX(${precentWidth}px)`
        }}
      ></div>
      <div
        className={`absolute ${activeColors[20] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform:`rotate(300deg) translateX(${precentWidth}px)`
        }}
      ></div>
      <div
        className={`absolute ${activeColors[21] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform:`rotate(315deg) translateX(${precentWidth}px)`
        }}
      ></div>
      <div
        className={`absolute ${activeColors[22] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform:`rotate(330deg) translateX(${precentWidth}px)`
        }}
      ></div>
      <div
        className={`absolute ${activeColors[23] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform:`rotate(345deg) translateX(${precentWidth}px)`
        }}
      ></div>
     

      { children }

    </div>
    </>
  );
}


function FocusSession({TotalSessionMinute,setIsRun,mode,currentSessionMinute}){

  const [totalMinutes,setTotalMinutes] = useState(0)

  const breaks = Math.floor(totalMinutes / 35);

  function FocusSessionStarter(){
   
    if ( !mode )
      alert("Enter your Mode")
    else{
      TotalSessionMinute.current = totalMinutes;
      if (TotalSessionMinute.current >= 30)
            currentSessionMinute.current = 30;
      else
        currentSessionMinute.current = TotalSessionMinute.current;
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
<section className='flex flex-col justify-start items-center  shadow-lg bg-gray-800 text-white p-8 rounded-lg h-full gap-4 select-none'>
<div>
  <h1 className="font-extrabold from-stone-50">Focus here and now</h1>
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
  className="font-bold text-xl md:text-3xl w-2/3 h-3/7 m-auto text-center border border-transparent rounded-md outline-none transition duration-200 
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
  <p className="text-emerald-50 font-semibold "> You'll have {breaks} breaks </p>
</div>

<div className="bg-blue-700 rounded-md p-2 text-blue-50 font-bold hover:scale-110 transition-transform duration-500 ease-linear">
  <button className="inline-flex gap-2" onClick={FocusSessionStarter} >  
    <Play className="cursor-pointer  hover:scale-110 transition-transform" />
    Start Focus Session</button>
</div>

</section>
);

}


function Notification({ isBreak, onClose ,isVisible }) {
  return (
    <div style={{ visibility: isVisible ? "visible" : "hidden" }} className="fixed bottom-0 right-0  bg-gray-100 border border-gray-300 shadow-lg rounded-lg p-4 m-4 w-72">
    
      <div className="flex justify-end">
        <button 
          onClick={onClose} 
          className="text-gray-600 hover:text-gray-900"
          aria-label="Close notification"
        >
          X
        </button>
      </div>

    
      <div className="mt-2 text-center">
        {isBreak ? (
          <p className="text-lg font-semibold text-green-700">
            Break is Over, Time to Enjoy Your Session
          </p>
        ) : (
          <p className="text-lg font-semibold text-blue-700">
            Enjoying Session is Over, Time for a Break
          </p>
        )}
      </div>
    </div>
  );
}



function FloatingButton() {
  return (
    <div className="fixed right-4 top-4 bg-amber-900 text-white px-4 py-2 rounded-md shadow-lg hover:bg-amber-700 transition-all">
      <Link to="/LearningPage" className="text-white text-sm font-semibold">
        Learn How to Focus
      </Link>
    </div>
  );
}









 