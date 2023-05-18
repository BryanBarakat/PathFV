import React, { useEffect, useState } from "react";
import "./Panel.css";
import { useParams } from "../context/Context";
import Draggable from "react-draggable";
import Start from "../../assets/shuttle.png";
import End from "../../assets/button.png";
import Wall from "../../assets/firewalling.png";
import Weight from "../../assets/dumbbell.png";
import Restart from "../../assets/restarting.png";
import Run from "../../assets/run-dev.png";
import configured from "../../assets/config.png";
import bomb from "../../assets/round-bomb.png";
import erasers from "../../assets/eraser.png";
import drags from "../../assets/drag.png";
import combine from "../../assets/combine.png";
import close from "../../assets/close_new.png";

export const Panel = () => {
  const { drag, setdrag, content, setcontent, minimode, setminimode } =
    useParams();

  if (!drag) {
    return;
  }

  let indexes = [
    "start",
    "end",
    "wall",
    "weight",
    "bomb",
    "restart",
    "run",
    "configure",
    "erase",
  ];

  const setClass = (curr_mode, class_name) => {
    let classList = [];
    if (minimode == curr_mode) {
      classList.push(class_name);
    }
    let index = indexes.indexOf(curr_mode);
    classList.push(`img-${index + 1}`);
    return classList.join(" ");
  };

  const checkMiniMode = () => {
    switch (minimode) {
      case "start":
        setcontent(
          <div>
            <h5 className="title-helper">Start Button</h5>
            <br />
            <span>
              <h5>
                The starting point on the grid for your algorithm is selected
                using the start button. By clicking twice on the grid and
                dragging your pointer, you can change it.
              </h5>
            </span>
          </div>
        );
        break;
      case "end":
        setcontent(
          <div>
            <h5 className="title-helper">Target Button</h5> <br />
            <span>
              <h5>
                The targetted location on the grid for your algorithm is
                selected using the Target button. By clicking twice on the grid
                and dragging your pointer, you can change it.
              </h5>
            </span>
          </div>
        );
        break;
      case "wall":
        setcontent(
          <div>
            <h5 className="title-helper">Wall Button</h5>
            <br />
            <span>
              <h5>
                The wall button is used to build walls to the grid, making them
                impossible to enter, blocking some paths, and acting as
                obstacles. This increases the interest of the algorithms.
              </h5>
            </span>
          </div>
        );
        break;
      case "weight":
        setcontent(
          <div>
            <h5 className="title-helper">Weight Button</h5>
            <br />
            <span>
              <h5>
                The weight button is used to increase the weighted pathways in
                weighted algorithms, similar to google maps, it helps us define
                if roads or areas are busy.
              </h5>
            </span>
          </div>
        );
        break;
      case "bomb":
        setcontent(
          <div>
            <h5 className="title-helper">Bomb Button</h5>
            <br />
            <span>
              <h5>
                The bomb button is used to add a stop along the way to the
                targetted node, which means 2 nodes are targets, it is similar
                to uber when picking up or dropping off 2 people.
              </h5>
            </span>
          </div>
        );
        break;
      case "restart":
        setcontent(
          <div>
            <h5 className="title-helper">Restart Button</h5>
            <br />
            <span>
              <h5>
                The restart button is used to clear the board to be able to add
                new algorithms,obstacles or targetted positions.
              </h5>
            </span>
          </div>
        );
        break;
      case "run":
        setcontent(
          <div>
            <h5 className="title-helper">Run Button</h5>
            <br />
            <span>
              <h5>
                The algorithm is run by pressing the run button, and (in some
                cases) the process of determining the shortest path is begun to
                be visualised.
              </h5>
            </span>
          </div>
        );
        break;
      case "configure":
        setcontent(
          <div>
            <h5 className="title-helper">Settings Button</h5>
            <br />
            <span>
              <h5>
                The settings button enables you to access the configuration
                window where you can adjust the pace of the algorithms and other
                variables.
              </h5>
            </span>
          </div>
        );
        break;
      case "erase":
        setcontent(
          <div>
            <h5 className="title-helper">Eraser Button</h5>
            <br />
            <span>
              <h5>
                The Eraser is used to erase any walls or obstacles that you have
                misplaced or want to remove while preparing your grid obstacles
                and constraints.
              </h5>
            </span>
          </div>
        );
        break;
      case "combine":
        setcontent(
          <div>
            <h5 className="title-helper">The Help Panel</h5>
            <br />
            <span>
              <h5>
                The help panel is here to make things easier while first using
                the software, every button in the navigation bar has a role, you
                can click on one of them and then double click and drag on the
                grid.
              </h5>
            </span>
          </div>
        );
        break;
    }
  };

  useEffect(() => {
    checkMiniMode();
  }, [minimode]);

  return (
    <Draggable>
      <div id="panel-container" className="panel-container">
        <img className="drag-obj" src={drags}></img>
        <img
          className="drag-obj2"
          src={close}
          onClick={() => {
            setdrag((old) => {
              return !old;
            });
          }}
        ></img>
        <div className="main-content-panel">{content}</div>
        <div className="nav-bar-panel">
          <img
            onClick={() => {
              setminimode("combine");
            }}
            className={setClass("combine", "combine-content")}
            src={combine}
          ></img>
          &nbsp;&nbsp;&nbsp;
          <img
            onClick={() => {
              setminimode("start");
            }}
            className={setClass("start", "start-content")}
            src={Start}
          ></img>
          <img
            onClick={() => {
              setminimode("end");
            }}
            className={setClass("end", "end-content")}
            src={End}
          ></img>
          <img
            onClick={() => {
              setminimode("wall");
            }}
            className={setClass("wall", "wall-content")}
            src={Wall}
          ></img>
          <img
            onClick={() => {
              setminimode("weight");
            }}
            className={setClass("weight", "weight-content")}
            src={Weight}
          ></img>
          <img
            onClick={() => {
              setminimode("bomb");
            }}
            className={setClass("bomb", "bomb-content")}
            src={bomb}
          ></img>
          <img
            onClick={() => {
              setminimode("restart");
            }}
            className={setClass("restart", "restart-content")}
            src={Restart}
          ></img>
          <img
            onClick={() => {
              setminimode("run");
            }}
            className={setClass("run", "run-content")}
            src={Run}
          ></img>
          <img
            onClick={() => {
              setminimode("configure");
            }}
            className={setClass("configure", "configure-content")}
            src={configured}
          ></img>
          <img
            onClick={() => {
              setminimode("erase");
            }}
            className={setClass("erase", "erase-content")}
            src={erasers}
          ></img>
        </div>
      </div>
    </Draggable>
  );
};
