import { useRef, useState, useEffect } from "react";
import {
  INITIAL_VALUE,
  ReactSVGPanZoom,
  TOOL_NONE,
  fitSelection,
  zoomOnViewerCenter,
  fitToViewer,
} from "react-svg-pan-zoom";
import { useGlobalTree } from "../contexts/NodeContext";
import Canvas from "./Canvas";
export default function CanvasWrapper() {
  const Viewer = useRef(null);
  const [tool, setTool] = useState(TOOL_NONE);
  const [value, setValue] = useState(INITIAL_VALUE);

  //get coordinates of first node from global state
  const { globalState } = useGlobalTree();
  // let firstNode = elements[0];

  useEffect(() => {
    const svg = document.querySelector("svg");
    svg.addEventListener("mousedown", (e) => {
      //if the element has the class draggable, set the tool to pan
      if (!e.target.classList.contains("draggable-node")) {
        //set to pan
        setTool("pan");
      }
    });
    svg.addEventListener("mouseup", (e) => {
      setTool("none");
    });
  }, []);
  useEffect(() => {
    Viewer.current.fitToViewer();
  }, []);

  return (
    <div
      className="canvas-wrapper"
      style={{
        // backgroundColor: "buttonface",
        padding: "10px",
        borderRadius: "10px",
        marginLeft: "20px",
        width:"65%"
      }}
    >
      <ReactSVGPanZoom
        ref={Viewer}
        style={{
          width: "100%",
          height: "100%",
          outline: "none",
          borderRadius: "10px",
          backgroundColor: "#f9fbfb",
        }}
        width={900}
        background="#f9fbfb"
        height={700}
        tool={tool}
        onChangeTool={setTool}
        value={value}
        onChangeValue={setValue}
        preventPanOutside={true}
        detectAutoPan={false}
      >
        <svg
          className="canvas"
          width={1000}
          height={1000}
          style={{ backgroundColor: "red" }}
        >
          <Canvas></Canvas>
        </svg>
      </ReactSVGPanZoom>
    </div>
  );
}
