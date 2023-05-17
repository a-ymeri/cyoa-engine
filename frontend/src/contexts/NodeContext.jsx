import { createContext, useState, useContext, useMemo, useEffect } from "react";

const TreeContext = createContext();

export const TreeContextProvider = ({ children, value }) => {
  console.log("props", value);
  //load from local storage if it exists
  let [initialData, initialEdges] = getLocalState();
  // let initialEdges = JSON.parse(localStorage.getItem(value + "edges"));

  //get game mode from url
  let gameMode = window.location.pathname.split("/")[1];

  const [globalState, setGlobalState] = useState({
    nodes: initialData,
    edges: initialEdges,
    selectedNode: initialData[0],
    selectedNodeIndex: 0,
    gameMode,
  });

  function getLocalState() {
    if (!localStorage.getItem(value + "nodes")) {
      return [
        [
          {
            id: 1,
            x: 100,
            y: 100,
            xOffset: 0,
            yOffset: 0,
            active: false,
            text: "Root",
            color: "red",
            options: [],
          },
        ],
        [],
      ];
    }
    let localData = JSON.parse(localStorage.getItem(value + "nodes"));
    let localEdges = JSON.parse(localStorage.getItem(value + "edges"));
    return [localData, localEdges];
  }
  useEffect(() => {
    localStorage.setItem(value + "nodes", JSON.stringify(globalState.nodes));
    localStorage.setItem(value + "edges", JSON.stringify(globalState.edges));
  }, [globalState]);

  const getID = () => {
    let id = 0;
    //find first empty slot, considering deletions exist
    for (let i = 1; i <= globalState.nodes.length; i++) {
      //find element with id = i using find method
      let found = globalState.nodes.find((el) => el.id == i);
      console.log("found", found);
      if (!found) {
        id = i;
        console.log("not found, empty", id);
        return id;
      }
    }
    return globalState.nodes.length + 1;
  };

  globalState.edges = useMemo(() => {
    let edges = [];
    globalState.nodes?.forEach((el, index) => {
      el.options?.forEach((option) => {
        if (option.next) {
          edges.push({
            source: globalState.nodes[index].id,
            target: option.next,
          });
        }
      });
    });
    // console.log("edges", edges);
    return edges;
  }, [globalState]);

  const addNode = (propNode) => {
    setGlobalState((curr) => {
      let newObj = { ...curr };
      let newNode;
      if (!propNode) {
        newNode = {
          label: "Empty",
          text: "",
          options: [],
          x: 0,
          y: 0,
          id: getID(),
          type: "text",
        };
      } else {
        newNode = propNode;
        newNode.id = getID();
      }
      // if (type) {
      //   newNode.type = type;
      // }
      console.log("newNode", newNode);
      newObj.nodes.push(newNode);
      newObj.selectedNode = newNode;
      newObj.selectedNodeIndex = newObj.nodes.length - 1;
      return newObj;
    });
  };

  const resetTree = () => {
    setGlobalState((curr) => {
      let newObj = { ...curr };
      newObj.nodes = [
        {
          label: "Empty",
          text: "",
          options: [],
          x: 0,
          y: 0,
          id: 1,
          type: "text",
        },
      ];
      newObj.selectedNode = newObj.nodes[0];
      newObj.selectedNodeIndex = 0;
      newObj.edges = [];
      return newObj;
    });
  };

  const removeNode = () => {
    // if(globalState.nodes.length === 1){
    //   alert("You can't delete the root node");
    //   return;
    // }
    setGlobalState((curr) => {
      let newObj = { ...curr };
      let index = newObj.selectedNodeIndex;
      newObj.nodes.splice(index, 1);
      newObj.selectedNode = newObj.nodes[0];
      newObj.selectedNodeIndex = 0;
      return newObj;
    });
  };

  const setElements = (elements) => {
    setGlobalState((curr) => {
      let newObj = { ...curr };
      newObj.nodes = elements;
      return newObj;
    });
  };

  const editNodeLabel = (label) => {
    setGlobalState((curr) => {
      let newObj = { ...curr };
      newObj.nodes[globalState.selectedNodeIndex].label = label;
      return newObj;
    });
  };

  const setActive = (index) => {
    setGlobalState((curr) => {
      let newObj = { ...curr };
      newObj.selectedNode = newObj.nodes[index];
      newObj.selectedNodeIndex = index;
      return newObj;
    });
  };

  const addOption = (option) => {
    setGlobalState((curr) => {
      let newObj = { ...curr };
      let index = newObj.selectedNodeIndex;
      newObj.nodes[index].options.push(option);
      return newObj;
    });

    //create edge to new node
    setGlobalState((curr) => {
      let newObj = { ...curr };
      let index = newObj.selectedNodeIndex;
      let newEdge = {
        source: index,
        target: newObj.nodes.length - 1,
      };
      newObj.edges.push(newEdge);
      return newObj;
    });
  };

  const editOption = (index, option) => {
    setGlobalState((curr) => {
      let newObj = { ...curr };
      newObj.nodes[globalState.selectedNodeIndex].options[index] = option;
      return newObj;
    });

    //update edge to new node
    setGlobalState((curr) => {
      let newObj = { ...curr };
      let index = newObj.selectedNodeIndex;
      let newEdge = {
        source: index,
        target: newObj.nodes.length - 1,
      };
      newObj.edges.push(newEdge);
      return newObj;
    });
  };

  const removeOption = (index) => {
    setGlobalState((curr) => {
      let newObj = { ...curr };
      let nodeIndex = newObj.selectedNodeIndex;
      newObj.nodes[nodeIndex].options.splice(index, 1);
      return newObj;
    });
  };

  const editNodeText = (text) => {
    setGlobalState((curr) => {
      let newObj = { ...curr };
      newObj.nodes[globalState.selectedNodeIndex].text = text;
      return newObj;
    });
  };

  const importTree = (data) => {
    setGlobalState((curr) => {
      let newObj = { ...curr };
      newObj.nodes = data.nodes;
      newObj.edges = data.edges;
      newObj.selectedNode = data.nodes[0];
      newObj.selectedNodeIndex = 0;
      return newObj;
    });
  };

  const setCondition = (field, value) => {
    setGlobalState((curr) => {
      let newObj = { ...curr };
      newObj.nodes[globalState.selectedNodeIndex][field] = value;
      return newObj;
    });
  };

  const addItem = () => {
    setGlobalState((curr) => {
      let newObj = { ...curr };
      if (!newObj.nodes[globalState.selectedNodeIndex].items)
        newObj.nodes[globalState.selectedNodeIndex].items = [];
      newObj.nodes[globalState.selectedNodeIndex].items.push({
        name: "",
        description: "",
        pickable: false,
        keyID: "",
      });
      return newObj;
    });
  };

  const editItem = (index, item) => {
    setGlobalState((curr) => {
      let newObj = { ...curr };
      newObj.nodes[globalState.selectedNodeIndex].items[index] = item;
      return newObj;
    });
  };

  const removeItem = (index) => {
    setGlobalState((curr) => {
      let newObj = { ...curr };
      newObj.nodes[globalState.selectedNodeIndex].items.splice(index, 1);
      return newObj;
    });
  };

  return (
    <TreeContext.Provider
      value={{
        globalState,
        addNode,
        removeNode,
        setActive,
        setElements,
        addOption,
        editOption,
        editNodeText,
        editNodeLabel,
        importTree,
        addItem,
        resetTree,
        setCondition,
        removeOption,
        editItem,
        removeItem,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

export const useGlobalTree = () => {
  const context = useContext(TreeContext);
  return context;
};
