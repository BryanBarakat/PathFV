import React from "react";
import combine from "../../assets/combine.png";
import "./MobileRestriction.css";

export const MobileRestriction = () => {
  return (
    <div className="mobile-container">
      <div className="popup-container">
        <h1>
          <img src={combine}></img> PathFV
        </h1>
        <h1>Software Requires a Laptop</h1>
        <br />
        <p>This software can only be used on a laptop or desktop computer.</p>
        <p>Please switch to a laptop or desktop to access all features.</p>
      </div>
    </div>
  );
};

export default MobileRestriction;
