import React from "react";
import { useGlobalTree } from "../contexts/NodeContext";
import { TextField, Button } from "@mui/material";

const Items = ({ element }) => {
  const { addItem, globalState } = useGlobalTree();
  const gameMode = globalState.gameMode;
  const handleEditOptionText = (e, index, item) => {
    item = { ...item, text: e.target.value };
  };

  if (gameMode != "zork") {
    return <div></div>;
  }

  return (
    <div
      style={{
        // textAlign: "center",
      }}
    >
      <h2>Items:</h2>
      {element.items?.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              margin: "5px",
              border: "2px solid white",
              padding: "5px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div>
              <TextField
                style={{
                  width: "100%",
                  fontSize: "20px",
                  marginBottom: "10px",
                }}
                label="Name"
                value={item.text}
                onChange={(e) => {
                  handleEditOptionText(e, index, item);
                }}
              />
              <TextField
                style={{ width: "100%", fontSize: "16px", color: "white", marginBottom: "10px" }}
                label="Description"
                value={item.text}
                onChange={(e) => {
                  handleEditOptionText(e, index, item);
                }}
              />
              <TextField
                style={{ width: "100%", fontSize: "16px", color: "white", marginBottom: "10px" }}
                label="Key ID"
                value={item.text}
                onChange={(e) => {
                  handleEditOptionText(e, index, item);
                }}
              />
              Can be picked up:
              <input
                type="checkbox"
                checked={item.pickable}
                onChange={(e) => {
                  // handleEditOptionText(e, index, item);
                }}
              />
            </div>
            <button
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ef233c",
                flex: 1,
                color: "white",
                // width: "20%",
                marginLeft: "10px",
                onClick: () => {
                  //   deleteItem(index);
                },
                borderRadius: "0px",
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
      <button
        style={{ width: "80%", marginTop: "10px", display: "block" }}
        // onClick={addItem}
      >
        Add Item
      </button>
    </div>
  );
};

export default Items;
