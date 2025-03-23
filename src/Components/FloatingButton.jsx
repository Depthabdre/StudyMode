import { Link } from "react-router-dom";

function FloatingButton() {
    return (
      <div className="absolute right-4 top-4 bg-amber-900 text-white px-4 py-2 rounded-md shadow-lg hover:bg-amber-700 transition-all">
        <Link to="/LearningPage" className="text-white text-sm font-semibold">
          Learn How to Focus
        </Link>
      </div>
    );
  }
export default FloatingButton;