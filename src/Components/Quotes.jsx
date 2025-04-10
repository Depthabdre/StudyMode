/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import clsx from "clsx";

function Quotes({ quotes, setQuotes, isRun }) {
  const [currentQuote, setCurrentQuote] = useState("");
  const [displayedQuote, setDisplayedQuote] = useState("");
  const [newQuote, setNewQuote] = useState("");

  useEffect(() => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }
  }, [quotes]);

  useEffect(() => {
    setDisplayedQuote("");
    let index = 0;
    const interval = setInterval(() => {
      if (index < currentQuote.length) {
        setDisplayedQuote((prev) => prev + currentQuote[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentQuote]);

  function newQuoteHandler() {
    if (newQuote.trim()) {
      setQuotes((prevQuotes) => [...prevQuotes, newQuote]);
      setNewQuote("");
    }
  }

  function onChangeHandler(e) {
    setNewQuote(e.target.value);
  }

  return (
    <div
      className={clsx(
        "flex flex-col place-items-center justify-center gap-6 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-xl w-full p-6",
        isRun ? "h-[40vh] md:h-[60vh]" : "h-full"
      )}
    >
      {!isRun ? (
        <>
          <input
            type="text"
            value={newQuote}
            onChange={onChangeHandler}
            className="text-gray-900 dark:text-gray-100 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-colors duration-200"
            placeholder="Enter your quote..."
          />
          <button
            onClick={newQuoteHandler}
            className="bg-blue-600 dark:bg-blue-700 text-white dark:text-gray-100 px-6 py-2 rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all"
          >
            Add Quote
          </button>
        </>
      ) : (
        ""
      )}
      <div className="w-full flex justify-center items-center text-center text-gray-900 dark:text-gray-100 font-sans">
        <p className="text-gray-900 dark:text-white font-bold text-lg">{displayedQuote}</p>
      </div>
    </div>
  );
}

export default Quotes;