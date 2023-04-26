import { useState } from "react";
import reactLogo from "./assets/react.svg";
// import "./components/Draggable";
import "./App.css";
// import Draggable from "./components/Draggable";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import CanvasWrapper from "./components/CanvasWrapper";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { TreeContextProvider } from "./contexts/NodeContext";

function App() {
  // //Let's make a div that can be dragged around the screen

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <TreeContextProvider value="story">
          <Navbar />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "65%" }}>
              <CanvasWrapper />
            </div>
            <div style={{ width: "25%" }}>
              <Sidebar />
            </div>
          </div>
        </TreeContextProvider>
      ),
    },
    {
      path: "/zork",
      element: (
        <TreeContextProvider value="zork">
          <Navbar />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "65%" }}>
              <CanvasWrapper />
            </div>
            <div style={{ width: "25%" }}>
              <Sidebar />
            </div>
          </div>
        </TreeContextProvider>
      ),
    },
    {
      path: "/dnd",
      element: (
        <TreeContextProvider value="dnd">
          <Navbar />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "65%" }}>
              <CanvasWrapper />
            </div>
            <div style={{ width: "25%" }}>
              <Sidebar />
            </div>
          </div>
        </TreeContextProvider>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router}>
        <div className="App">{/* {router.render()} */}</div>
      </RouterProvider>
    </>
  );
}

const Navbar = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#2B2D42",
          color: "white",
          padding: "10px",
        }}
      >
        <h2 style={{}}>CYOA Level editor</h2>
        <div
          className="Nav"
          style={{
            //float to the topright, bigger font size, and a little padding, not fixed
            fontSize: "1.5rem",
            padding: "1rem",
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
          }}
        >
          {/* <img src} alt="react logo" /> */}
          <div style={{ paddingRight: "1rem" }}>
            <a
              href="/"
              style={{
                textDecoration: "none",
                color: "#8d99ae",
              }}
            >
              Story
            </a>
          </div>
          <div style={{ paddingRight: "1rem" }}>
            <a
              href="/zork"
              style={{
                textDecoration: "none",
                color: "#8d99ae",
              }}
            >
              Zork
            </a>
          </div>
          <div style={{ paddingRight: "1rem" }}>
            <a
              href="/dnd"
              style={{
                textDecoration: "none",
                color: "#8d99ae",
              }}
            >
              D&D
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
