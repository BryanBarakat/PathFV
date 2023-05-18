import React, { useEffect, useState } from "react";
import "./Tutorial.css";
import icon from "../../assets/combine.png";
import node from "../../assets/node.png";
import algorithms from "../../assets/algo-picking.png";
import demo from "../../assets/demoGif.gif";
import panelHelp from "../../assets/helpPanel.png";
import { useParams } from "../context/Context";

export const Tutorial = () => {
  const { tut, settut, drag, drag2 } = useParams();

  const [desc, setdesc] = useState(
    <div className="sub-container1">
      <h4>1/7</h4>
      <h1>Welcome to Pathfinding Visualizer!</h1>
      <br />
      <h2>
        This short tutorial will walk you through all of the features of this
        application.
      </h2>
      <br />
      <h3>
        If you want to dive right in, feel free to press the "Skip Tutorial"
        button below. Otherwise, press "Next"!
      </h3>
      <br />
      <br />
      <img className="image-page-1" src={icon}></img>
      <br />
      <br />
    </div>
  );

  useEffect(() => {
    let dragId = document.getElementById("panel-container");
    let dragId2 = document.getElementById("panel-container2");
    if (tut != "" && drag) {
      dragId.style.left = "-500vw";
      dragId.style.bottom = "-500vh";
    }
    if (tut != "" && drag2) {
      dragId2.style.left = "-500vw";
      dragId2.style.bottom = "-500vh";
    }
    switch (tut) {
      case "page1":
        setdesc(
          <div className="sub-container1">
            <h4>1/7</h4>
            <h1>Welcome to Pathfinding Visualizer!</h1>
            <br />
            <h2>
              This short tutorial will walk you through all of the features of
              this application.
            </h2>
            <br />
            <h3>
              If you want to dive right in, feel free to press the "Skip
              Tutorial" button below. Otherwise, press "Next"!
            </h3>
            <br />
            <br />
            <img className="image-page-1" src={icon}></img>
            <br />
            <br />
          </div>
        );
        break;
      case "page2":
        setdesc(
          <div className="sub-container2">
            <h4>2/7</h4>
            <h1>What is a pathfinding algorithm?</h1>
            <br />
            <h2>
              At its core, a pathfinding algorithm seeks to find the shortest
              path between two points. This application visualizes various
              pathfinding algorithms in action, and more!
            </h2>
            <br />
            <h3>
              All of the algorithms on this application are adapted for a 2D
              grid, where 90 degree turns have a "cost" of 1 and movements from
              a node to another have a "cost" of 1.
            </h3>
            <br />
            <br />
            <img className="image-page-2" src={node}></img>
            <br />
            <br />
            <br />
          </div>
        );
        break;
      case "page3":
        setdesc(
          <div className="sub-container3">
            <h4>3/7</h4>
            <h1>Picking an algorithm</h1>
            <br />
            <h2>Choose an algorithm from the "Algorithms" drop-down menu.</h2>
            <br />
            <h3>
              Note that some algorithms are unweighted, while others are
              weighted. Unweighted algorithms do not take turns or weight nodes
              into account, whereas weighted ones do. Additionally, not all
              algorithms guarantee the shortest path.
            </h3>
            <br />
            <br />
            <img className="image-page-3" src={algorithms}></img>
            <br />
            <br />
            <br />
          </div>
        );
        break;
      case "page4":
        setdesc(
          <div className="sub-container4">
            <h4>4/7</h4>
            <h1>Meet the algorithms</h1>
            <br />
            <h2>Not all algorithms are created equal.</h2>
            <br />
            <h3>
              <span>Dijkstra's Algorithm</span> (weighted): the father of
              pathfinding algorithms; guarantees the shortest path <br />{" "}
              <span>A* Search </span>
              (weighted): arguably the best pathfinding algorithm; uses
              heuristics to guarantee the shortest path much faster than
              Dijkstra's Algorithm Greedy <br /> <span>
                Best-first Search
              </span>{" "}
              (weighted): a faster, more heuristic-heavy version of A*; does not
              guarantee the shortest path <br /> <span>Swarm Algorithm</span>{" "}
              (weighted): a mixture of Dijkstra's Algorithm and A*; does not
              guarantee the shortest-path <br />{" "}
              <span>Convergent Swarm Algorithm</span> (weighted): the faster,
              more heuristic-heavy version of Swarm; does not guarantee the
              shortest path <br />
              <span> Bidirectional Swarm Algorithm</span> (weighted): Swarm from
              both sides; does not guarantee the shortest path <br />{" "}
              <span>Breath-first Search</span> (unweighted): a great algorithm;
              guarantees the shortest path <br />{" "}
              <span>Depth-first Search</span> (unweighted): a very bad algorithm
              for pathfinding; does not guarantee the shortest path
            </h3>
            <br />
            <br />
            <br />
          </div>
        );
        break;
      case "page5":
        setdesc(
          <div className="sub-container5">
            <h4>5/7</h4>
            <h1>Adding walls and weights</h1>
            <br />
            <h2>
              Click on the grid to add a wall. Click on the grid while pressing
              W to add a weight. Generate mazes and patterns from the "Mazes &
              Patterns" drop-down menu.
            </h2>
            <br />
            <h3>
              Walls are impenetrable, meaning that a path cannot cross through
              them. Weights, however, are not impassable. They are simply more
              "costly" to move through. In this application, moving through a
              weight node has a "cost" of 15.
            </h3>
            <br />
            <br />
            <img className="image-page-4" src={demo}></img>
            <br />
            <br />
            <br />
          </div>
        );
        break;
      case "page6":
        setdesc(
          <div className="sub-container6">
            <h4>6/7</h4>
            <h1>Browsing the Help Panel</h1>
            <br />
            <h2>
              You can toggle the panel at the settings tab if you do not want it
              visible!
            </h2>
            <br />
            <h3>
              If you are new to using this software, the Help Panel is a very
              helpful tool because it explains each item on the navigation bar
              and how to utilise it. You can do this in the settings tab by
              clicking on the settings button in the navigation bar to open the
              tab and removing its visibility.
            </h3>
            <br />
            <br />
            <img className="image-page-5" src={panelHelp}></img>
            <br />
            <br />
            <br />
          </div>
        );
        break;
      case "page7":
        setdesc(
          <div className="sub-container7">
            <h4>7/7</h4>
            <h1>Enjoy Learning and Visualizing</h1>
            <br />
            <h2>
              Have fun experimenting with various algorithms and patterns.
            </h2>
            <br />
            <h3>
              In addition to the wall, weight, and algorithms options, there are
              many other tools available. Try them all out!
            </h3>
            <br />
            <br />
            <h1 className="pathfv-tit">PathFV</h1>
            <br />
            <br />
            <br />
          </div>
        );
        break;
    }
  }, [tut]);

  if (tut == "") {
    return;
  }

  const skipTutorial = () => {
    settut("");
  };

  const putPanelBack = () => {
    let dragId = document.getElementById("panel-container");
    let dragId2 = document.getElementById("panel-container2");
    dragId.style.left = "24px";
    dragId.style.bottom = "24px";
    dragId2.style.left = "24px";
    dragId2.style.bottom = "24px";
  };

  return (
    <div className="container-tut">
      {desc}
      <section className="buttons">
        <section className="skip">
          <button
            onClick={() => {
              skipTutorial();
              document
                .getElementById("configuring")
                .classList.remove("selectedOption_1");
              putPanelBack();
            }}
          >
            Skip Tutorial
          </button>
        </section>
        <section className="navigate">
          {tut != "page1" ? (
            <button
              onClick={() => {
                settut(
                  `${tut.slice(0, tut.length - 1)}${
                    parseInt(tut.slice(tut.length - 1)) - 1
                  }`
                );
              }}
              className="prev-but"
            >
              Previous
            </button>
          ) : null}
          {tut != "page7" ? (
            <button
              onClick={() => {
                settut(
                  `${tut.slice(0, tut.length - 1)}${
                    parseInt(tut.slice(tut.length - 1)) + 1
                  }`
                );
              }}
            >
              Next
            </button>
          ) : null}
        </section>
      </section>
    </div>
  );
};

export default Tutorial;
