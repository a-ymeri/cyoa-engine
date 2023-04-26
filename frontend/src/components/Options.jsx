import React from "react";
import { useGlobalTree } from "../contexts/NodeContext";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/base";
import { InputLabel, MenuItem, Select } from "@mui/material";

const Options = () => {
  const { globalState, addOption, editOption } = useGlobalTree();
  const element = globalState.nodes[globalState.selectedNodeIndex];
  const options = element?.options;
  const nonConditionalOptions = options?.filter((option) => !option.condition);
  const conditionalOptions = options?.filter((option) => option.condition);

  const gameMode = globalState.gameMode;

  const handleEditOptionText = (e, index, option) => {
    option = { ...option, text: e.target.value };
    editOption(index, option);
  };

  const handleEditOptionNext = (e, index, option) => {
    option = { ...option, next: e.target.value };
    editOption(index, option);
  };

  const handleAddConditionalOption = () => {
    addOption({ text: "", success: 0, failure: 0, condition: ["9", "str"] });
  };

  const getOptions = () => {
    if (gameMode == "dnd") {
      if (element.type == "decision") {
        return <DecisionNodeOptions node={element} />;
      } else {
        return <NormalOptions />;
      }
    } else if (gameMode == "zork") {
      return <ZorkNodeOptions />;
    }
    return <NormalOptions />;
  };
  return (
    <div>
      <h2>Options:</h2>
      <div style={{ marginBottom: "10px" }}>{getOptions()}</div>
    </div>
  );
};

const DecisionNodeOptions = ({ node }) => {
  const { globalState, addOption, editOption } = useGlobalTree();
  const handleEditOptionNext = (e, index, option) => {
    option = { ...option, next: e.target.value };
    editOption(index, option);
  };
  console.log(node);
  const stat = node.options[0].condition[1];
  return (
    <div>
      <div>
        <InputLabel id="stat-select-label">Requirement</InputLabel>
        <Select
          id="outlined-basic"
          labelId="stat-select-label"
          variant="outlined"
          style={{
            marginBottom: "10px",
            marginRight: "10px",
            width: "40%",
          }}
          value={selectedStat}
          onChange={handleStatChange}
        >
          <MenuItem value="str">Strength</MenuItem>
          <MenuItem value="dex">Dexterity</MenuItem>
          <MenuItem value="con">Constitution</MenuItem>
          <MenuItem value="int">Intelligence</MenuItem>
          <MenuItem value="wis">Wisdom</MenuItem>
          <MenuItem value="cha">Charisma</MenuItem>
        </Select>
        <TextField
          id="outlined-basic"
          label="Value"
          type="number"
          variant="outlined"
          style={{
            width: "20%",
            marginBottom: "10px",
            marginLeft: "10px",
          }}
        />
      </div>
      {node.options.map((option, index) => (
        <TextField
          id="outlined-basic"
          label={index == 0 ? "Success" : "Failure"}
          variant="outlined"
          value={option.next}
          onChange={(e) => handleEditOptionNext(e, index, option)}
          type="number"
          style={{
            marginBottom: "10px",
            marginRight: "10px",
            width: "40%",
          }}
        />
      ))}
    </div>
  );
};

const NormalOptions = () => {
  const { globalState, addOption, editOption } = useGlobalTree();
  const element = globalState.nodes[globalState.selectedNodeIndex];

  const handleAddOption = () => {
    addOption({ text: "", value: 0 });
  };

  const handleEditOptionText = (e, index, option) => {
    option = { ...option, text: e.target.value };
    editOption(index, option);
  };

  const handleEditOptionNext = (e, index, option) => {
    option = { ...option, next: e.target.value };
    editOption(index, option);
  };
  return (
    <div>
      {element.options.map((option, index) => (
        <>
          <TextField
            id="outlined-basic"
            label="Text"
            variant="outlined"
            value={option.text}
            onChange={(e) => handleEditOptionText(e, index, option)}
            style={{
              marginBottom: "10px",
              marginRight: "10px",
              width: "40%",
            }}
          />
          <TextField
            id="outlined-basic"
            label="Next"
            variant="outlined"
            value={option.next}
            onChange={(e) => handleEditOptionNext(e, index, option)}
            type="number"
            style={{
              marginBottom: "10px",
              marginRight: "10px",
              width: "40%",
            }}
          />
        </>
      ))}

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddOption}
        style={{ marginRight: "10px" }}
      >
        Add Option
      </Button>
    </div>
  );
};

const ZorkNodeOptions = (element) => {
  return <div></div>;
};

export default Options;
