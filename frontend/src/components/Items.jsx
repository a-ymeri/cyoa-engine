import React from "react";
import { useGlobalTree } from "../contexts/NodeContext";
import { TextField, Button } from "@mui/material";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Items = ({ element }) => {
  const { addItem, globalState, editItem, removeItem } = useGlobalTree();
  const gameMode = globalState.gameMode;

  const handleEditItemText = (e, index, item) => {
    item = { ...item, name: e.target.value };
    editItem(index, item);
  };

  const handleEditItemDescription = (e, index, item) => {
    item = { ...item, description: e.target.value };
    editItem(index, item);
  };

  const handleEditItemKeyID = (e, index, item) => {
    item = { ...item, keyID: e.target.value };
    editItem(index, item);
  };

  if (gameMode != "zork") {
    return <div></div>;
  }

  console.log(element.items);
  return (
    <div
      style={
        {
          // textAlign: "center",
        }
      }
    >
      <h2>Items:</h2>
      {element.items?.map((item, index) => {
        return (
          <div
            key={item.id + index}
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
              <div style={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  style={{
                    width: "70%",
                    fontSize: "20px",
                    marginBottom: "10px",
                  }}
                  label="Name"
                  value={item.name}
                  onChange={(e) => {
                    handleEditItemText(e, index, item);
                  }}
                />
                <Button
                  style={{
                    width: "25%",
                    fontSize: "20px",
                    marginBottom: "10px",
                    backgroundColor: "#EF233C",
                    marginLeft: "20px",
                  }}
                  variant="contained"
                  onClick={() => {
                    removeItem();
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
              <TextField
                style={{
                  width: "70%",
                  fontSize: "16px",
                  color: "white",
                  marginBottom: "10px",
                }}
                label="Description"
                multiline
                value={item.description}
                onChange={(e) => {
                  handleEditItemDescription(e, index, item);
                }}
              />
              <TextField
                style={{
                  width: "25%",
                  fontSize: "16px",
                  color: "white",
                  marginBottom: "10px",
                  marginLeft: "5%",
                }}
                label="Key Name"
                value={item.keyID}
                onChange={(e) => {
                  handleEditItemKeyID(e, index, item);
                }}
              />
              Can be picked up:
              <input
                type="checkbox"
                checked={item.pickable}
                onChange={(e) => {
                  item = { ...item, pickable: e.target.checked };
                  editItem(index, item);
                }}
              />
            </div>
          </div>
        );
      })}
      <button
        style={{ width: "80%", marginTop: "10px", display: "block" }}
        onClick={addItem}
      >
        Add Item
      </button>
    </div>
  );
};

export default Items;
