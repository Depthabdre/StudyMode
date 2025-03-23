/* eslint-disable react/prop-types */

function MonthTable({ daymonth , month }) {
  
    function clickHandler(e) {
        if (e.target.innerText === "") {
          e.target.innerText = "X";
        } else {
          e.target.innerText = "";
        }
      }
      
    
    function buttonrender() {
      let result = [];
      for (let i = 0; i < daymonth[1]; i++) {
        result.push(
          <button
            key={`${daymonth[0]}-${i+1}`}
            className="w-4 h-4 bg-gray-900 rounded-sm hover:scale-125 relative text-sm text-red-600 font-extrabold"
            onClick={clickHandler}
            ></button>
        );
      }
      return result;
    }
  
    return (
  <section>
    <h1 className="text-center">{month}</h1>
    <div className="grid grid-flow-col grid-rows-7 gap-1.5">
      {buttonrender()}
    </div>
  </section>
  
    );
  }
export default MonthTable;  