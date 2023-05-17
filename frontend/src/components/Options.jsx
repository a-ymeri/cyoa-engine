import React, { useMemo } from "react";
import { useGlobalTree } from "../contexts/NodeContext";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/base";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Options = () => {
  return (
    <div>
      <h2>Options:</h2>
      <div style={{ marginBottom: "10px" }}>
        <OptionSwitch />
      </div>
    </div>
  );
};

const OptionSwitch = () => {
  const { globalState } = useGlobalTree();
  const element = globalState.nodes[globalState.selectedNodeIndex];
  const gameMode = globalState.gameMode;
  if (gameMode == "dnd") {
    if (element.type == "decision") {
      return <DecisionNodeOptions />;
    } else {
      return <NormalOptions />;
    }
  } else if (gameMode == "zork") {
    return <ZorkNodeOptions />;
  }
  return <NormalOptions />;
};

const DecisionNodeOptions = () => {
  const { globalState, addOption, editOption, setCondition } = useGlobalTree();
  const node = globalState.nodes[globalState.selectedNodeIndex];
  const handleEditOptionNext = (e, index, option) => {
    option = { ...option, next: Number(e.target.value) };
    editOption(index, option);
  };
  console.log(node);
  const stat = node.conditionStat;
  const requirement = node.conditionRequirement;
  const changeStat = (e, index) => {
    if (index == 0) {
      setCondition("conditionStat", e.target.value);
    } else {
      setCondition("conditionRequirement", e.target.value);
    }
  };
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
          value={stat}
          onChange={(e) => {
            changeStat(e, 0);
          }}
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
          value={requirement}
          onChange={(e) => {
            changeStat(e, 1);
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
  const { globalState, addOption, editOption, removeOption } = useGlobalTree();
  const element = globalState.nodes[globalState.selectedNodeIndex];

  const handleAddOption = () => {
    addOption({ text: "", value: 0 });
  };

  const handleEditOptionText = (e, index, option) => {
    option = { ...option, text: e.target.value };
    editOption(index, option);
  };

  const handleEditOptionNext = (e, index, option) => {
    option = { ...option, next: Number(e.target.value) };
    editOption(index, option);
  };

  const deleteOption = (index) => {
    removeOption(index);
  };
  return (
    <div>
      {element.options.map((option, index, arr) => (
        <div
          //align items center vertically
          key={element.id + "" + index + " " + arr.length}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
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
              width: "20%",
            }}
          />
          <Button
            variant=""
            onClick={() => deleteOption(index)}
            style={{
              marginRight: "10px",
              height: "100%",
              // color: "red",
              color: "white",
              // backgroundColor: "white",
              backgroundColor: "#EF233C",
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
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

const ZorkNodeOptions = () => {
  const { globalState, addOption, editOption, removeOption } = useGlobalTree();
  const element = globalState.nodes[globalState.selectedNodeIndex];
  const handleAddOption = () => {
    addOption({ text: "", value: 0, next: 0 });
  };
  const handleEditOptionText = (e, index, option) => {
    option = { ...option, text: e.target.value };
    editOption(index, option);
  };

  const handleEditOptionNext = (e, index, option) => {
    option = { ...option, next: Number(e.target.value) };
    editOption(index, option);
  };
  return (
    <div>
      {element.options?.map((option, index, arr) => (
        <div>
          <InputLabel id="direction-select-label">Direction</InputLabel>
          <Select
            id="outlined-basic"
            labelId="direction-select-label"
            variant="outlined"
            style={{
              marginBottom: "10px",
              marginRight: "10px",
              width: "30%",
            }}
            value={option.text}
            onChange={(e) => {
              handleEditOptionText(e, index, option);
            }}
          >
            <MenuItem value="north">North</MenuItem>
            <MenuItem value="south">South</MenuItem>
            <MenuItem value="east">East</MenuItem>
            <MenuItem value="west">West</MenuItem>
            <MenuItem value="up">Up</MenuItem>
            <MenuItem value="down">Down</MenuItem>
            <MenuItem value="in">In</MenuItem>
            <MenuItem value="out">Out</MenuItem>
            <MenuItem value="northeast">North-East</MenuItem>
            <MenuItem value="northwest">North-West</MenuItem>
            <MenuItem value="southeast">South-East</MenuItem>
            <MenuItem value="southwest">South-West</MenuItem>
          </Select>
          <TextField
            type="number"
            label="Next"
            variant="outlined"
            style={{
              marginBottom: "10px",
              marginRight: "10px",
              width: "20%",
            }}
            value={option.next}
            onChange={(e) => {
              handleEditOptionNext(e, index, option);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            style={{
              marginBottom: "10px",
              marginRight: "10px",
              width: "30%",
            }}
            value={option.password}
            onChange={(e) => {
              option = { ...option, password: e.target.value };
              editOption(index, option);
            }}
          />
        </div>
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

export default Options;
