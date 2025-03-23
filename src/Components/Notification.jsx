// Desc: Notification component to display a message when the session is over or break is over

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
  export default Notification;