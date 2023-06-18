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
import bombing from "../../assets/round-bomb.png";
import erasers from "../../assets/eraser.png";

export const NavBar = () => {
  const {
    mode,
    bomb,
    start,
    refArrayCopy,
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

  function recursiveDivisionMaze(
    grid,
    startX,
    startY,
    width,
    height,
    orientation
  ) {
    if (width < 2 || height < 2) {
      return;
    }

    // Choose orientation (vertical or horizontal) for the division
    const isVertical = orientation === "vertical";

    // Choose a random position for the wall
    const wallX =
      startX + (isVertical ? Math.floor(Math.random() * (width - 2)) + 1 : 0);
    const wallY =
      startY + (isVertical ? 0 : Math.floor(Math.random() * (height - 2)) + 1);

    // Choose a random position for the passage
    const passageX =
      wallX + (isVertical ? 0 : Math.floor(Math.random() * width));
    const passageY =
      wallY + (isVertical ? Math.floor(Math.random() * height) : 0);

    // Carve the wall
    for (let x = startX; x < startX + width; x++) {
      for (let y = startY; y < startY + height; y++) {
        if (isVertical && x === wallX) {
          grid[y][x].iswall = true;
        } else if (!isVertical && y === wallY) {
          grid[y][x].iswall = true;
        }
      }
    }

    // Carve the passage
    grid[passageY][passageX].iswall = false;

    // Recurse on the divided chambers if there is enough space
    if (isVertical && wallX - startX > 1) {
      recursiveDivisionMaze(
        grid,
        startX,
        startY,
        wallX - startX + 1,
        height,
        chooseOrientation(wallX - startX + 1, height)
      );
    }
    if (!isVertical && wallY - startY > 1) {
      recursiveDivisionMaze(
        grid,
        startX,
        startY,
        width,
        wallY - startY + 1,
        chooseOrientation(width, wallY - startY + 1)
      );
    }
    if (isVertical && startX + width - wallX > 2) {
      recursiveDivisionMaze(
        grid,
        wallX + 1,
        startY,
        startX + width - wallX - 1,
        height,
        chooseOrientation(startX + width - wallX - 1, height)
      );
    }
    if (!isVertical && startY + height - wallY > 2) {
      recursiveDivisionMaze(
        grid,
        startX,
        wallY + 1,
        width,
        startY + height - wallY - 1,
        chooseOrientation(width, startY + height - wallY - 1)
      );
    }
  }

  function chooseOrientation(width, height) {
    if (width < height) {
      return "horizontal";
    } else if (height < width) {
      return "vertical";
    } else {
      return Math.random() < 0.5 ? "horizontal" : "vertical";
    }
  }

  function generateMaze() {
    const newGrid = grid.map((row) => [...row]); // Create a copy of the existing grid
    // Call the recursive division algorithm to generate the maze
    recursiveDivisionMaze(
      newGrid,
      0,
      0,
      newGrid[0].length,
      newGrid.length,
      chooseOrientation(newGrid[0].length, newGrid.length)
    );
    setmaze(newGrid); // Update the maze grid state with the generated maze
  }

  const coordinates = [
    [23, 1],
    [22, 2],
    [21, 3],
    [20, 4],
    [19, 5],
    [18, 6],
    [17, 7],
    [16, 8],
    [15, 9],
    [14, 10],
    [13, 11],
    [12, 12],
    [11, 13],
    [10, 14],
    [9, 15],
    [8, 16],
    [7, 17],
    [6, 18],
    [5, 19],
    [4, 20],
    [3, 21],
    [2, 22],
    [1, 23],
    [2, 24],
    [3, 25],
    [4, 26],
    [5, 27],
    [6, 28],
    [7, 29],
    [8, 30],
    [9, 31],
    [10, 32],
    [11, 33],
    [12, 34],
    [13, 35],
    [14, 36],
    [15, 37],
    [16, 38],
    [17, 39],
    [18, 40],
    [19, 41],
    [20, 42],
    [21, 43],
    [20, 44],
    [19, 45],
    [18, 46],
    [17, 47],
    [16, 48],
  ];

  function SimpleStairPattern() {
    for (let i = 0; i < coordinates.length; i++) {
      const x = coordinates[i][1];
      const y = coordinates[i][0];
      grid[y][x].iswall = true;
      refArrayCopy[x + y * 50].current.style[
        "animation"
      ] = `simple-stair 0.12s ease-out ${
        i * 20
      }ms alternate 1 forwards running`;
    }
  }

  function BasicWeightMaze(min, max, count) {
    var values = [];

    // Create an array with all values in the range
    for (var i = min; i <= max; i++) {
      values.push(i);
    }

    // Shuffle the array using Fisher-Yates algorithm
    for (var i = values.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = values[i];
      values[i] = values[j];
      values[j] = temp;
    }

    let randoms = values.slice(0, count);
    let new_grid = grid.slice();

    for (let i = 0; i < randoms.length; i++) {
      let indexY = Math.floor(randoms[i] / 50);
      let indexX = randoms[i] % 50;
      if (
        !new_grid[indexY][indexX].iswall &&
        !new_grid[indexY][indexX].isstart &&
        !new_grid[indexY][indexX].istarget &&
        !new_grid[indexY][indexX].isbomb &&
        !new_grid[indexY][indexX].iseraser
      ) {
        new_grid[indexY][indexX] = {
          ...new_grid[indexY][indexX],
          weight: 5,
        };
      }
    }
    setgrid(new_grid);
  }

  function BasicRandomMaze(min, max, count) {
    var values = [];

    // Create an array with all values in the range
    for (var i = min; i <= max; i++) {
      values.push(i);
    }

    // Shuffle the array using Fisher-Yates algorithm
    for (var i = values.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = values[i];
      values[i] = values[j];
      values[j] = temp;
    }

    let randoms = values.slice(0, count);
    let new_grid = grid.slice();

    for (let i = 0; i < randoms.length; i++) {
      let indexY = Math.floor(randoms[i] / 50);
      let indexX = randoms[i] % 50;
      if (
        !new_grid[indexY][indexX].isstart &&
        !new_grid[indexY][indexX].istarget &&
        !new_grid[indexY][indexX].isbomb &&
        !new_grid[indexY][indexX].iseraser
      ) {
        new_grid[indexY][indexX] = {
          ...new_grid[indexY][indexX],
          iswall: true,
        };
      }
    }
    setgrid(new_grid);
  }

  const resetGridMaze = () => {
    let newgrid = grid.slice();
    for (let i = 0; i < newgrid.length; i++) {
      for (let j = 0; j < newgrid[i].length; j++) {
        let el = newgrid[i][j];
        el.iswall = false;
        el.isbomb = false;
        el.iseraser = false;
        el.weight = 1;
      }
    }
    bomb.current = { x: null, y: null };
    refArrayCopy.map((el) => {
      el.current.style["backgroundColor"] = "white";
      el.current.style["animation"] = "none";
    });
    setgrid(newgrid);
  };

  useEffect(() => {
    switch (maze) {
      case "BasicMaze":
        let min = 0;
        let max = 1249;
        let Walls = 300;
        resetGridMaze();
        BasicRandomMaze(min, max, Walls);
        break;
      case "BasicWeight":
        let mini = 0;
        let maxi = 1249;
        let weightItems = 400;
        resetGridMaze();
        BasicWeightMaze(mini, maxi, weightItems);
        break;
      case "SimpleStair":
        resetGridMaze();
        SimpleStairPattern();
        break;
      case "RecursiveDivision":
        resetGridMaze();
        generateMaze();
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
            <img className="image-nav0" src={bombing}></img>
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
            <option className="option" value={"Dijkstra"}>
              Dijkstra's Shortest Path
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
            <option className="option" value={"RecursiveDivision"}>
              Recursive Division
            </option>
            <option className="option" value={"BasicMaze"}>
              Basic Random Maze
            </option>
            <option className="option" value={"BasicWeight"}>
              Basic Weight Maze
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
