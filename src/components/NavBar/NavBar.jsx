import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { useParams } from "../context/Context";
import Start from "../../assets/shuttle.png";
import End from "../../assets/button.png";
import Wall from "../../assets/firewalling.png";
import Weight from "../../assets/dumbbell.png";
import Restart from "../../assets/restarting.png";
import Run from "../../assets/run-dev.png";
import combine from "../../assets/combine.png";
import configured from "../../assets/config.png";
import bomb from "../../assets/round-bomb.png";
import erasers from "../../assets/eraser.png";

export const NavBar = () => {
  const {
    mode,
    setmode,
    algo,
    setalgo,
    maze,
    setmaze,
    setres,
    setrun,
    speed,
    setspeed,
    seterror,
    settut,
    grid,
    setgrid,
    seteraser,
    setdrag,
    config,
    setconfig,
    setdrag2,
    drag,
    drag2,
  } = useParams();

  const configure = () => {
    !config ? setconfig(true) : setconfig(false);
  };

  const checkAlgo = () => {
    if (algo == "") {
      seterror("An Algorithm has to be chosen.");
    } else {
      seterror("");
    }
  };

  useEffect(() => {
    switch (maze) {
      case "SimpleStair":
        //todo
        break;
    }
  }, [maze]);

  const pointerEvents = () => {
    const arr = [
      document.getElementById("start"),
      document.getElementById("target"),
      document.getElementById("wall"),
      document.getElementById("weight"),
      document.getElementById("bomb"),
      document.getElementById("res"),
      document.getElementById("run"),
      document.getElementById("eraser_id"),
      document.getElementById("configuring"),
    ];
    for (const element of arr) {
      element.style.opacity = "0.15";
      element.style.pointerEvents = "none";
    }
  };

  const pointerEventsActive = () => {
    const arr = [
      document.getElementById("start"),
      document.getElementById("target"),
      document.getElementById("wall"),
      document.getElementById("weight"),
      document.getElementById("bomb"),
      document.getElementById("res"),
      document.getElementById("run"),
      document.getElementById("eraser_id"),
      document.getElementById("configuring"),
    ];
    for (const element of arr) {
      element.style.opacity = "1";
      element.style.pointerEvents = "auto";
    }
  };

  const checkEraser = () => {
    let changes = false;
    grid.map((el) => {
      el.map((el) => {
        if (el.iseraser) {
          changes = true;
        }
      });
    });
    return changes;
  };

  const checkMode = (curr_mode) => {
    if (mode == curr_mode) {
      setmode(null);
    }
    setmode(curr_mode);
  };

  const setClass = (curr_mode, class_name) => {
    let classList = [];
    if (mode == curr_mode) {
      classList.push(class_name);
    }
    return classList.join(" ");
  };

  const setClassEraser = (curr_mode, class_name) => {
    let classList = [];
    if (mode == curr_mode || checkEraser()) {
      classList.push(class_name);
    }
    return classList.join(" ");
  };

  return (
    <div className="container">
      <ul className="list">
        <li className="title-list">
          <li className="title">
            <a href="">
              <img className="image-navv1" src={combine}></img>
              <span>PathFV</span>
            </a>
          </li>
        </li>
        <li className="options">
          <li
            id="start"
            onClick={() => {
              checkMode("setstart");
            }}
            className={setClass("setstart", "selectedOption1")}
          >
            <img className="image-nav1" src={Start}></img>
          </li>
          <li
            id="target"
            onClick={() => {
              checkMode("settarget");
            }}
            className={setClass("settarget", "selectedOption2")}
          >
            <img className="image-nav2" src={End}></img>
          </li>
          <li
            id="wall"
            onClick={() => {
              checkMode("setwall");
            }}
            className={setClass("setwall", "selectedOption3")}
          >
            <img className="image-nav3" src={Wall}></img>
          </li>
          <li
            id="weight"
            onClick={() => {
              checkMode("setweight");
            }}
            className={setClass("setweight", "selectedOption4")}
          >
            <img className="image-nav4" src={Weight}></img>
          </li>
          <li
            id="bomb"
            onClick={() => {
              checkMode("setbomb");
            }}
            className={setClass("setbomb", "selectedOption0")}
          >
            <img className="image-nav0" src={bomb}></img>
          </li>
          <li
            id="res"
            onClick={() => {
              pointerEventsActive();
              setres((old) => {
                return !old;
              });
              setmode(null);
            }}
          >
            <img className="image-nav5" src={Restart}></img>
          </li>
          <li
            id="run"
            onClick={() => {
              if (algo != "") {
                pointerEvents();
                setconfig(false);
              }
              checkAlgo();
              setrun((old) => {
                return !old;
              });
              setmode(null);
            }}
          >
            <img className="image-nav6" src={Run}></img>
          </li>
          <li
            id="configuring"
            onClick={() => {
              configure();
              checkMode("setconfigures");
            }}
            className={setClass("setconfigures", "selectedOption_1")}
          >
            <img className="image-nav7" src={configured}></img>
          </li>
          <li
            id="eraser_id"
            onClick={() => {
              if (mode == "seteraser" || checkEraser()) {
                setmode(null);
                const newgrid = grid.map((el) => {
                  return el.map((el) => {
                    if (el.iseraser) {
                      return { ...el, iseraser: false };
                    } else {
                      return el;
                    }
                  });
                });
                setgrid(newgrid);
              } else {
                setmode("seteraser");
              }
              seteraser((old) => {
                return !old;
              });
            }}
            className={setClassEraser("seteraser", "selectedOption__1")}
          >
            <img className="image-nav8" src={erasers}></img>
          </li>
        </li>
        <li className="algos">
          <select
            onChange={(e) => {
              setalgo(e.target.value);
            }}
            className="selection"
            value={algo}
          >
            <option className="option" value={""}>
              Algorithms
            </option>
            <option className="option" value={"DFS"}>
              Depth-First Search
            </option>
            <option className="option" value={"BFS"}>
              Breadth-First Search
            </option>
            <option className="option" value={"Bidirectional"}>
              Bidirectional Swarm Algorithm
            </option>
          </select>
          <select
            onChange={(e) => {
              setmaze(e.target.value);
            }}
            className="selection mazes-patterns"
            value={maze}
          >
            <option className="option" value={""}>
              Mazes & Patterns
            </option>
            <option className="option" value={"SimpleStair"}>
              Simple Stair Pattern
            </option>
          </select>
        </li>
      </ul>
      {config && (
        <div className="configuration-tab">
          <h1>Settings</h1>
          <br />
          <h2>Configure your grid and pathfinder settings to your needs!</h2>
          <br />
          <div className="speed">
            <div className="speed-div">
              <h3>Speed &nbsp;</h3>
              <select
                onChange={(e) => {
                  setspeed(e.target.value);
                }}
                className="selection2"
                value={speed}
              >
                <option className="option" value="Slow">
                  Slow
                </option>
                <option className="option" value="Average">
                  Average
                </option>
                <option className="option" value="Fast">
                  Fast
                </option>
              </select>
            </div>
            <div className="help-div">
              <h3>Help Panels &nbsp;</h3>
              {!(drag && drag2) ? (
                <button
                  className="toggle-btn-help"
                  onClick={() => {
                    setdrag(true);
                    setdrag2(true);
                  }}
                >
                  Enable
                </button>
              ) : (
                <button className="enabled-opt">Enabled</button>
              )}
            </div>
          </div>
          <br />
          <div className="tutorial">
            <h3>Follow the program's tutorial</h3>
            <br />
            <button
              className="toggle-btn-help2"
              onClick={() => {
                settut("page1");
                setconfig(false);
              }}
            >
              Tutorial
            </button>
          </div>
          <div className="close">
            <button
              className="toggle-btn-help3"
              onClick={() => {
                configure();
                document
                  .getElementById("configuring")
                  .classList.remove("selectedOption_1");
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
