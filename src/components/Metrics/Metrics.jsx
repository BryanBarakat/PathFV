import React from "react";
import { useParams } from "../context/Context";
import path from "../../assets/pathway.png";
import runningTime from "../../assets/running-time.png";
import visitedNodes from "../../assets/visited-nodes.png";
import "./Metrics.css";

export const Metrics = () => {
  const { metrics, runtime, numNodes, pathNodes } = useParams();

  if (metrics === false) {
    return;
  }

  return (
    <div className="metrics-container">
      <h2>
        <img src={visitedNodes}></img>&nbsp;&nbsp; Number of Visited Nodes:
        &nbsp;
        <span>{numNodes}</span>
      </h2>
      <h2>
        <img src={path}></img>&nbsp;&nbsp; Number of Pathway Nodes: &nbsp;
        <span>{pathNodes}</span>
      </h2>
      <h2>
        <img src={runningTime}></img>&nbsp;&nbsp; Algorithm's Runtime: &nbsp;
        <span>{runtime} ms</span>
      </h2>
    </div>
  );
};
