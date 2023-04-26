// import React, { useState, useEffect, useRef } from "react";

// const Draggable = ({ x, y, value }) => {
//   const isDragged = useRef(false);
//   const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
//   const initialPosition = useRef({ x: 0, y: 0 });

//   useEffect(() => {
//     document.addEventListener("mouseup", handleMouseUp);
//     document.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       document.removeEventListener("mouseup", handleMouseUp);
//       document.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   const handleMouseDown = (e) => {
//     isDragged.current = true;
//     initialPosition.current = { x: e.clientX, y: e.clientY };
//   };

//   const handleMouseUp = () => {
//     isDragged.current = false;
//     initialPosition.current = { x: 0, y: 0 };
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragged.current) return;

//     setCurrentPosition({
//       x: e.clientX - initialPosition.current.x,
//       y: e.clientY - initialPosition.current.y,
//     });
//   };

//   const styles = {
//     // transform: `translate(${currentPosition.x}px, ${currentPosition.y}px)`,
//     // position: "absolute",
//     backgroundColor: isDragged.current ? "red" : "blue",
//   };

//   return (
//     <g>
//       <rect
//         width={50}
//         height={50}
//         x={currentPosition.x}
//         y={currentPosition.y}
//         fill="#fff"
//         stroke="#000"
//         onMouseDown={handleMouseDown}
//         style={styles}
//       />
//       <text
//         x={currentPosition.x - 25}
//         y={currentPosition.y - 25}
//         textAnchor="middle"
//         alignmentBaseline="middle"
//       >
//         {value}
//       </text>
//     </g>
//   );
// };

// export default Draggable;
