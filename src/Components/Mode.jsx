import  { useState } from "react";
import PropTypes from 'prop-types';

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
             className=" text-black px-4 py-3 border border-gray-300 rounded-full bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
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
  Mode.propTypes = {
    mode: PropTypes.string.isRequired,
    setMode: PropTypes.func.isRequired,
    isPause: PropTypes.bool.isRequired,
  };
  
  export default Mode;
 
