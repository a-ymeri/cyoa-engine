import React from "react";
import { useGlobalTree } from "../contexts/NodeContext";
import { TextField, Button } from "@mui/material";
import Options from "./Options";
import Items from "./Items";

const NodeDescription = () => {
  const { globalState, editOption, editNodeText, editNodeLabel } =
    useGlobalTree();
  const element = globalState.nodes[globalState.selectedNodeIndex];
  const gameMode = globalState.gameMode;

  const handleEditText = (e) => {
    editNodeText(e.target.value);
  };

  const handleEditLabel = (e) => {
    editNodeLabel(e.target.value);
  };
  return (
    <div>
      <h4>Node id: {element.id}</h4>

      <div>
        <TextField
          id="outlined-basic"
          label={gameMode === "zork" ? "Area name" : "Label"}
          variant="outlined"
          value={element.label}
          onChange={handleEditLabel}
          style={{
            marginBottom: "10px",
          }}
        />
      </div>

      {element.type !== "decision" && (
        <div>
          <TextField
            id="outlined-basic"
            label={gameMode === "zork" ? "Description" : "Text"}
            variant="outlined"
            value={element.text}
            onChange={handleEditText}
            multiline
            style={{
              resize: "both",
              width: "80%",
            }}
          />
        </div>
      )}
      {/* <hr></hr> */}

      <Options />
      <Items element={element} />
    </div>
  );
};

export default NodeDescription;
