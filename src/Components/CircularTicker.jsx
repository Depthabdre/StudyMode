import { useEffect, useRef, useState } from "react";

function CircularTicker({ children, activeColors }) {
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

  const percentWidth = 0.75 * (parentWidth / 2);

  return (
    <div ref={parentRef} className="relative aspect-square flex flex-col justify-center items-center shadow-md bg-gray-700 rounded-full h-full md:h-1/2 lg:h-3/4">
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className={`absolute ${activeColors[i] ? "bg-blue-500" : "bg-gray-500"} w-4 h-1 rounded-full`}
          style={{
            top: "50%",
            left: "50%",
            transformOrigin: "left center",
            transform: `rotate(${i * 15}deg) translateX(${percentWidth}px)`
          }}
        ></div>
      ))}
      {children}
    </div>
  );
}

export default CircularTicker;