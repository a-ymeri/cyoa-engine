import React, { useEffect, useState } from "react";
import { useGlobalTree } from "../contexts/NodeContext";

export default function Canvas() {
  // add listener for mouse move, so we can track the mouse position for the line
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  let { globalState, setElements, setActive } = useGlobalTree();
  let active = globalState.selectedNodeIndex;
  // const decisionNodes = globalState.nodes.filter((item) => item.type === "on");
  // const elements = globalState.nodes.filter((item) => item.type !== "on");
  const elements = globalState.nodes;
  let edges = globalState.edges;
  function handleMouseMove(e) {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  function truncate(str, length) {
    return str.length > length ? str.substring(0, length) + "..." : str;
  }
  function handlePointerDown(index1, e) {
    let newElements = elements.map((item, index2) => {
      if (index1 === index2) {
        setActive(index1);
        const el = e.currentTarget;
        const bbox = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - bbox.left;
        const y = e.clientY - bbox.top;
        el.setPointerCapture(e.pointerId);
        return { ...item, xOffset: x, yOffset: y, active: true };
      }
      return item;
    });

    setElements(newElements);
  }

  function handlePointerMove(index1, e) {
    let newElements = elements.map(function (item, index2) {
      if (index1 === index2 && item.active === true) {
        const bbox = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - bbox.left;
        const y = e.clientY - bbox.top;

        return {
          ...item,
          x: item.x - (item.xOffset - x),
          y: item.y - (item.yOffset - y),
        };
      }
      return item;
    });
    setElements(newElements);
  }

  function handlePointerUp(index1, e) {
    let newElements = elements.map(function (item, index2) {
      if (index1 === index2) {
        return { ...item, active: false };
      }
      return item;
    });

    setElements(newElements);
  }

  // const diamondElements = decisionNodes.map(function (item, index) {});

  const rectElements = elements.map(function (item, index) {
    if (item.type === "decision") {
      return (
        <g key={index}>
          <polygon
            key={index.toString()}
            points={`${item.x + 100},${item.y} ${item.x + 200},${item.y + 50} ${
              item.x + 100
            },${item.y + 100} ${item.x},${item.y + 50}`}
            fill="white"
            stroke={active == index ? "#EF233C" : "#2B2D42"}
            strokeWidth={3}
            style={{ cursor: "pointer" }}
            className="draggable-node"
            onPointerDown={(evt) => handlePointerDown(index, evt)}
            onPointerUp={(evt) => handlePointerUp(index, evt)}
            onPointerMove={(evt) => handlePointerMove(index, evt)}
          ></polygon>
          <text
            x={item.x + 100}
            y={item.y + 50}
            textAnchor="middle"
            alignmentBaseline="middle"
            strokeWidth={2}
            pointerEvents="none"
            //   style={{
            //     textDecoration: (active == index ? "underline" : "none"),
          //   }}
          >
            {truncate(item.id + ": " + item.label, 20)}
          </text>
        </g>
      );
    } else {
      return (
        <g key={index}>
          <rect
            key={index.toString()}
            x={item.x}
            y={item.y}
            fill="white"
            stroke={active == index ? "#EF233C" : "#2B2D42"}
            width={200}
            //show cursor when hovering over the rect
            style={{ cursor: "pointer" }}
            className="draggable-node"
            height={100}
            strokeWidth={3}
            onPointerDown={(evt) => handlePointerDown(index, evt)}
            onPointerUp={(evt) => handlePointerUp(index, evt)}
            onPointerMove={(evt) => handlePointerMove(index, evt)}
          ></rect>
          <text
            x={item.x + 100}
            y={item.y + 50}
            textAnchor="middle"
            alignmentBaseline="middle"
            strokeWidth={2}
            pointerEvents="none"
            //   style={{
            //     textDecoration: (active == index ? "underline" : "none"),
            //   }}
          >
            {truncate(item.id + ": " + item.label, 20)}
          </text>
        </g>
      );
    }
  });

  function getRectSides(rect) {
    let height = 100;
    let width = 200;
    return [
      { x: rect.x, y: rect.y + height / 2 }, //left
      { x: rect.x + width / 2, y: rect.y }, //top
      { x: rect.x + width, y: rect.y + height / 2 }, //right
      { x: rect.x + width / 2, y: rect.y + height }, //bottom
    ];
  }

  function getClosestEdge(source, target) {
    let sourceSides = getRectSides(source);
    let targetSides = getRectSides(target);

    //if target is lower than source, then source bottom and target top
    if (Math.abs(target.y - source.y) > 100 && target.y > source.y) {
      return [
        sourceSides[3].x,
        sourceSides[3].y,
        targetSides[1].x,
        targetSides[1].y,
      ];
    }
    if (Math.abs(target.y - source.y) > 100 && target.y < source.y) {
      return [
        sourceSides[1].x,
        sourceSides[1].y,
        targetSides[3].x,
        targetSides[3].y,
      ];
    }

    //if target is left of source, then source left and target right
    if (target.x < source.x) {
      return [
        sourceSides[0].x,
        sourceSides[0].y,
        targetSides[2].x,
        targetSides[2].y,
      ];
    }

    //if target is right of source, then source right and target left
    if (target.x > source.x) {
      return [
        sourceSides[2].x,
        sourceSides[2].y,
        targetSides[0].x,
        targetSides[0].y,
      ];
    }

    //if target is higher than source, then source top and target bottom

    return [sourceSides.x, sourceSides.y, targetSides.x, targetSides.y];
  }

  const lineElements = edges.map(function (item, index) {
    //find source by id
    let source = elements.find((element) => element.id == item.source);
    //find target by id
    let target = elements.find((element) => element.id == item.target);
    if (!source || !target) {
      return null;
    }
    // let x1 = source.x + 100;
    // let y1 = source.y + 100;
    // let x2 = target.x + 100;
    // let y2 = target.y;

    let [x1, y1, x2, y2] = getClosestEdge(source, target);

    return (
      <line
        key={index.toString()}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="black"
        strokeLinecap="round"
      />
    );
  });

  return (
    <>
      {rectElements}
      {lineElements}
      {/* {diamondElements} */}
    </>
  );
}
