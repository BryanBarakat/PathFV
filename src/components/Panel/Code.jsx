import React, { useEffect, useState } from "react";
import "./Code.css";
import { useParams } from "../context/Context";
import Draggable from "react-draggable";
import close from "../../assets/close_new.png";
import codeBFS from "../../assets/BFS.png";
import codeDFS from "../../assets/DFS.png";
import codeBDS from "../../assets/BDS.png";
import prog from "../../assets/web-programming.png";
import dragger from "../../assets/drag.png";

export const Code = () => {
  const { drag2, algo, setdrag2 } = useParams();
  const [codeSnippet, setCodeSnippet] = useState(null);

  useEffect(() => {
    switch (algo) {
      case "BFS":
        setCodeSnippet(codeBFS);
        break;
      case "DFS":
        setCodeSnippet(codeDFS);
        break;
      case "BDS":
        setCodeSnippet(codeBDS);
        break;
      case "Bidirectional":
        setCodeSnippet(null);
        break;
      default:
        break;
    }
  }, [algo]);

  if (!drag2) {
    return;
  }

  return (
    <Draggable>
      <div id="panel-container2" className="panel-container2">
        <div className="drag-object-code">
          <img src={dragger}></img>
        </div>
        <div className="code">
          <img
            className="closePanel2"
            onClick={() => {
              setdrag2((old) => {
                return !old;
              });
            }}
            src={close}
          ></img>
          {!algo ? (
            <h2>Pick an Algorithm to display code</h2>
          ) : (
            <h3>{algo}'s Code</h3>
          )}
          {!algo ? (
            <img className="codeImg-error" src={prog}></img>
          ) : (
            <img className="codeImg" src={codeSnippet}></img>
          )}
        </div>
      </div>
    </Draggable>
  );
};
