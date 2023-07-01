import React, { useState, useEffect } from "react";
import "./App.css";
import { NavBar } from "./components/NavBar/NavBar";
import { Grid } from "./components/Grid/Grid";
import { useParams } from "./components/context/Context";
import Tutorial from "./components/Tutorial/Tutorial";
import MobileRestriction from "./components/MobileRestriction/MobileRestriction";

function App() {
  const { error, seterror } = useParams();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Update window width when the window is resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="App"
      onMouseMove={() => {
        setTimeout(() => {
          if (error !== "") {
            seterror("");
          }
        }, 1500);
      }}
    >
      {windowWidth < 1000 ? (
        <MobileRestriction />
      ) : (
        <>
          <NavBar />
          <Tutorial />
          <Grid />
        </>
      )}
    </div>
  );
}

export default App;
