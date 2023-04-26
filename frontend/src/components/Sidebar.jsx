import { useContext, useEffect } from "react";
import { useGlobalTree } from "../contexts/NodeContext";
import Options from "./Options";
import Items from "./Items";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import NodeDescription from "./NodeDescription";
export default function Sidebar() {
  const { addNode, removeNode, globalState, importTree, resetTree } = useGlobalTree();

  const handleDeleteNode = () => {
    removeNode();
  };

  const handleAddDecisionNode = () => {
    let decisionNode = {
      type: "decision",
      label: "Decision",
      options: [0, 0],
      requirement: 0,
      stat: "",
      x: 0,
      y: 0,
      conditionStat: "",
      conditionRequirement: 0,
    };
    addNode(decisionNode);
  };

  //function that downloads globalState as a json file
  const download = () => {
    let a = document.createElement("a");
    for (let i = 0; i < globalState.nodes.length; i++) {
      delete globalState.nodes[i].xOffset;
      delete globalState.nodes[i].yOffset;
      delete globalState.nodes[i].active;
    }
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(globalState, null, 2)], {
        type: "text/plain",
      })
    );
    a.setAttribute("download", "data.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        //background color is gradient from edf2f4 to white, left to right
        background: "white",
        height: "100%",
        paddingLeft: "20px",
        paddingTop: "20px",
        // borderLeft: "3px solid #a5a9aa",
        //box shadow
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
          paddingBottom: "10px",
          borderBottom: "1px solid black",
        }}
      >
        <Button onClick={resetTree}>Reset</Button>
        <Button
          onClick={download}
          style={{
            marginRight: "10px",
          }}
          variant="contained"
        >
          Download
        </Button>
        <Button variant="contained" component="label">
          Upload File
          <input type="file" hidden />
        </Button>
      </div>
      <hr></hr>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          style={{
            width: "45%",
            marginBottom: "10px",
          }}
          variant="contained"
          onClick={() => {
            addNode();
          }}
        >
          Add node +
        </Button>

        {globalState.gameMode === "dnd" && (
          <Button
            style={{
              width: "45%",
              marginBottom: "10px",
              backgroundColor: "#D5AC4E",
              color: "white",
            }}
            onClick={() => {
              handleAddDecisionNode();
            }}
          >
            Add Decision Node
          </Button>
        )}
        <Button
          style={{
            width: "45%",
            marginBottom: "10px",
            backgroundColor: "#EF233C",
            color: "white",
          }}
          variant="contained"
          onClick={handleDeleteNode}
        >
          Remove this node
        </Button>
      </div>

      <NodeDescription />
    </div>
  );
}
