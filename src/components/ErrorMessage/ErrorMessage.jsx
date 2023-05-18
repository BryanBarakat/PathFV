import React, { useEffect } from "react";
import { useParams } from "../context/Context";
import warning from "../../assets/warning.png";
import "./ErrorMessage.css";

export const ErrorMessage = () => {
  const { error } = useParams();

  if (error === "") {
    return;
  }

  return (
    <div className="error-container">
      <h2>
        <img src={warning}></img>&nbsp;&nbsp;{error}
      </h2>
    </div>
  );
};
