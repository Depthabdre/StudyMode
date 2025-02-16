import { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";


export default function App() {
  const [isRun, setIsRun] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [quotes, setQuotes] = useState([]);  // Fixed spelling here
  const intervalId = useRef(null); // Store interval reference

  useEffect(() => {
    if (isRun) {
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
  }, [isRun]);

  function clickHandler() {
    setIsRun(prev => !prev);
  }

  return (
    <main className="grid grid-cols-2 grid-rows-4 gap-4 w-[90vw] h-screen items-start justify-center  m-0 p-0">
      <Mode  />
      <TimeStarter clickHandler={clickHandler} isRun={isRun} totalSeconds={totalSeconds} />
      <Quotes quotes={quotes} setQuotes={setQuotes} /> {/* Fixed prop name here */}
    </main>
  );
}






     

function Quotes({ quotes, setQuotes }) {
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
      <input 
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
      </button>
    
      <div className="w-full text-center text-gray-700 font-medium">
        <ul className="space-y-3">
          {quoteRender}
        </ul>
      </div>
    </div>
  );
}


function Mode() {
  const [onEdit, setOnEdit] = useState(true);
  const [mode, setMode] = useState("");

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


function TimeStarter({ clickHandler, isRun, totalSeconds }) {
  const [activeColors, setActiveColors] = useState(Array(24).fill(false));

  useEffect(() => {
    if (totalSeconds % 10 === 0) {
      let index = Math.floor(totalSeconds / 10) - 1;

      setActiveColors((prevActiveColors) =>
        prevActiveColors.map((color, i) => (i === index ? true : color))
      );
    }
  }, [totalSeconds]);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <section className='grid grid-rows-10 grid-cols-1 justify-center items-start  shadow-lg bg-gray-800 text-white p-8 rounded-lg h-full row-span-2 '>
      <div className="row-span-9 flex flex-col justify-center items-center pt-18">
        <CircularTicker activeColors={activeColors}>
          <p className="text-5xl font-extrabold font-mono tracking-wide ">
            {minutes}:{String(seconds).padStart(2, '0')}
          </p>
        </CircularTicker>
      </div>

      <div className="flex justify-center items-center ">
        {isRun ? (
          <Pause onClick={clickHandler} size={32} className="cursor-pointer hover:scale-110 transition-transform" />
        ) : (
          <Play onClick={clickHandler} size={32} className="cursor-pointer hover:scale-110 transition-transform" />
        )}
      </div>
    </section>
  );
}

function CircularTicker({ children , activeColors }){

  return (
    <>
  <div className="relative w-64  border-gray-300 flex flex-col items-center justify-center">
     

      <div
        className={`absolute ${activeColors[0] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(0deg) translateX(100px)"}}
        
      ></div>
      <div
        className={`absolute ${activeColors[1] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(15deg) translateX(100px)"}}
      ></div>
      <div
        className={`absolute ${activeColors[2] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(30deg) translateX(100px)"}}
      ></div>
      <div
        className={`absolute ${activeColors[3] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(45deg) translateX(100px)"}}
      ></div>
      <div
        className={`absolute ${activeColors[4] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(60deg) translateX(100px)"}}
      ></div>
      <div
        className={`absolute ${activeColors[5] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(75deg) translateX(100px)"}}
      ></div>
      <div
        className={`absolute ${activeColors[6] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(90deg) translateX(100px)"}}
      ></div>
       <div
        className={`absolute ${activeColors[7] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(105deg) translateX(100px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[8] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(120deg) translateX(100px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[9] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(135deg) translateX(100px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[10] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(150deg) translateX(100px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[11] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(165deg) translateX(100px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[12] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(180deg) translateX(100px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[13] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(195deg) translateX(100px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[14] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(210deg) translateX(100px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[15] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(225deg) translateX(100px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[16] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(240deg) translateX(100px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[17] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(255deg) translateX(100px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[18] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(270deg) translateX(100px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[19] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(285deg) translateX(100px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[20] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(300deg) translateX(100px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[21] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(315deg) translateX(100px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[22] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(330deg) translateX(100px)"
        }}
      ></div>
      <div
        className={`absolute ${activeColors[23] ? "bg-blue-500" : "bg-gray-500"} w-6 h-2 rounded-full`}
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "left center",
          transform: "rotate(345deg) translateX(100px)"
        }}
      ></div>

      { children }

    </div>
    </>
  );
}








 