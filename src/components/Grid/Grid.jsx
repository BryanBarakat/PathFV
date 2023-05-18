import React, { useState, useRef, useEffect } from "react";
import { Tutorial } from "../Tutorial/Tutorial";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { Panel } from "../Panel/Panel";
import { useParams } from "../context/Context";
import Start from "../../assets/right-arrow_neo.png";
import End from "../../assets/button.png";
import Weight from "../../assets/kettlebell.png";
import Cube from "../../assets/square.png";
import bombs from "../../assets/round-bomb.png";
import erasers from "../../assets/eraser.png";
import { Code } from "../Panel/Code";
import { Metrics } from "../Metrics/Metrics";
import "./Grid.css";

export const Grid = () => {
  const {
    mode,
    algo,
    grid,
    setgrid,
    editing,
    seteditFlag,
    start,
    end,
    run,
    res,
    speed,
    seterror,
    bomb,
    eraser,
    setdrag,
    setdrag2,
    setmetrics,
    setRuntime,
    setNumNodes,
    setPathNodes,
  } = useParams();

  const setRefs = (grid) => {
    let mat = [];
    grid.map((elem) => {
      elem.map((item) => {
        mat.push(useRef());
      });
    });
    return mat;
  };

  const [refArray, setrefarray] = useState(setRefs(grid));

  var animationTime;

  const speedMeter = () => {
    let speedVal = 0;
    let speedPath = 0;
    switch (speed) {
      case "Slow":
        speedVal = 8;
        speedPath = 9;
        animationTime = 1.5;
        break;
      case "Average":
        speedVal = 5;
        speedPath = 6;
        animationTime = 1.2;
        break;
      case "Fast":
        speedVal = 3;
        speedPath = 4;
        animationTime = 0.9;
    }
    return [speedVal, speedPath];
  };

  const checkToRestart = (val1, val2) => {
    setTimeout(() => {
      if (
        refArray[end.current.x + end.current.y * 50].current.classList.contains(
          "path"
        ) ||
        refArray[
          bomb.current.x + bomb.current.y * 50
        ].current.classList.contains("path")
      ) {
        let restartButton = document.getElementById("res");
        restartButton.style.pointerEvents = "auto";
        restartButton.style.opacity = "1";
      }
    }, val1 * val2);
  };

  const getPathWay = () => {
    let getId = document.getElementById("start-btn-grid");
    if (
      start.current.x - 1 + start.current.y * 50 < refArray.length &&
      start.current.x - 1 + start.current.y * 50 >= 0 &&
      refArray[
        start.current.x - 1 + start.current.y * 50
      ].current.classList.contains("path")
    ) {
      getId.style.transform = "rotate(180deg)";
    } else if (
      start.current.x + (start.current.y - 1 * 50) < refArray.length &&
      start.current.x + (start.current.y - 1 * 50) >= 0 &&
      refArray[
        start.current.x + (start.current.y - 1 * 50)
      ].current.classList.contains("path")
    ) {
      getId.style.transform = "rotate(-90deg)";
    } else if (
      start.current.x + (start.current.y + 1 * 50) < refArray.length &&
      start.current.x + (start.current.y + 1 * 50) >= 0 &&
      refArray[
        start.current.x + (start.current.y + 1 * 50)
      ].current.classList.contains("path")
    ) {
      getId.style.transform = "rotate(90deg)";
    }
  };

  var rest = 0;

  const pathApproval = (result, val) => {
    let path = [];
    let timer = 0;
    let newprevmap = null;
    let current2 = null;
    let current = null;
    let prevmap = null;
    if (result != null) {
      timer = rest = result[1];
      current = result[0];
      prevmap = result[3];
      if (bomb.current.x != null && bomb.current.y != null) {
        timer = result[5];
        current = result[0];
        prevmap = result[2];
        current2 = result[4];
        newprevmap = result[6];
      }
      while (
        prevmap[`${current.x}-${current.y}`] != null ||
        (newprevmap &&
          current2 &&
          newprevmap[`${current2.x}-${current2.y}`] != null)
      ) {
        if (
          bomb.current.x != null &&
          bomb.current.y != null &&
          newprevmap[`${current2.x}-${current2.y}`] != null
        ) {
          path.push(current2);
          current2 = newprevmap[`${current2.x}-${current2.y}`];
        } else if (prevmap[`${current.x}-${current.y}`] != null) {
          path.push(current);
          current = prevmap[`${current.x}-${current.y}`];
        }
      }
      setTimeout(() => {
        path.reverse().forEach((elem, index) => {
          refArray[elem.x + elem.y * 50].current.style[
            "animation"
          ] = `render-visited-path 1.5s ease-out ${
            index * 15
          }ms alternate 1 forwards running`;
          refArray[elem.x + elem.y * 50].current.style["transition-delay"] = `${
            index * 15
          }ms`;
          refArray[elem.x + elem.y * 50].current.classList.add("path");
          getPathWay();
        });
        setPathNodes(path.length);
        seterror("");
        setmetrics(true);
      }, timer * val);
    } else {
      seterror("There are no available paths to get to the target location");
      let restartButton = document.getElementById("res");
      restartButton.style.pointerEvents = "auto";
      restartButton.style.opacity = "1";
    }
  };

  var BombExploration = false;

  function DFS(
    graph,
    hashmap,
    prevmap,
    start,
    target,
    class_name,
    class_name2
  ) {
    let numNode = 0;
    let timeDateBefore = new Date(Date.now());
    let bool_operation;
    let response = [];
    let stack = [start];
    let count = 0;
    let val = speedMeter();
    hashmap[`${start.x}-${start.y}`] = true;

    while (stack.length > 0) {
      count += 1;
      let c = stack.pop();
      refArray[c.x + c.y * 50].current.style["transition-delay"] = `${
        count * val[0]
      }ms`;
      refArray[c.x + c.y * 50].current.classList.add(class_name);
      refArray[c.x + c.y * 50].current.style[
        "animation"
      ] = `render-visited ${animationTime}s ease-out ${
        count * val[0]
      }ms alternate 1 forwards running`;

      if (c.x === bomb.current.x && c.y === bomb.current.y) {
        response.push(c, count, prevmap, val);
        bool_operation = true;
        numNode = count;
        break;
      }

      const neighbors = [
        { x: c.x + 1, y: c.y },
        { x: c.x - 1, y: c.y },
        { x: c.x, y: c.y + 1 },
        { x: c.x, y: c.y - 1 },
      ];

      for (let neighbor of neighbors) {
        const { x, y } = neighbor;

        if (
          x >= 0 &&
          x < 50 &&
          y >= 0 &&
          y < 25 &&
          !hashmap[`${x}-${y}`] &&
          !graph[y][x].iswall
        ) {
          stack.push(neighbor);
          prevmap[`${x}-${y}`] = { ...c };
          hashmap[`${x}-${y}`] = true;
        }
      }
    }

    let counter = 0;
    let newprevmap = {};
    let c = 0;

    function change() {
      let newhashmap = {};

      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          newprevmap[`${j}-${i}`] = null;
          newhashmap[`${j}-${i}`] = false;
        }
      }

      newhashmap[`${bomb.current.x}-${bomb.current.y}`] = true;
      let stack = [bomb.current];

      while (stack.length > 0) {
        counter += 1;
        c = stack.pop();
        refArray[c.x + c.y * 50].current.style["transition-delay"] = `${
          counter * val[0]
        }ms`;

        if (!refArray[c.x + c.y * 50].current.classList.contains(class_name)) {
          numNode += 1;
        }

        refArray[c.x + c.y * 50].current.classList.add(class_name2);
        refArray[c.x + c.y * 50].current.style[
          "animation"
        ] = `render-visited2 ${animationTime}s ease-out ${
          counter * val[0]
        }ms alternate 1 forwards running`;

        if (c.x === target.x && c.y === target.y) {
          response.push(c, counter, newprevmap);
          let timeDateAfter = new Date(Date.now());
          setRuntime(
            (
              timeDateAfter.getTime() -
              timeDateBefore.getTime() -
              count * val[0]
            ).toString()
          );
          setNumNodes(numNode);
          return true;
        }

        const neighbors = [
          { x: c.x + 1, y: c.y },
          { x: c.x - 1, y: c.y },
          { x: c.x, y: c.y + 1 },
          { x: c.x, y: c.y - 1 },
        ];

        for (let neighbor of neighbors) {
          const { x, y } = neighbor;

          if (
            x >= 0 &&
            x < 50 &&
            y >= 0 &&
            y < 25 &&
            !newhashmap[`${x}-${y}`] &&
            !graph[y][x].iswall
          ) {
            stack.push(neighbor);
            newprevmap[`${x}-${y}`] = { ...c };
            newhashmap[`${x}-${y}`] = true;
          }
        }
      }

      return false;
    }

    function x() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(change);
        }, count * val[0]);
      });
    }

    var final_res = null;

    x().then(() => {
      if (change() === true && bool_operation) {
        final_res = response;
        return response;
      } else {
        return null;
      }
    });

    async function fin() {
      const fin_res = await x();
      pathApproval(final_res, val[1]);
      checkToRestart(rest + counter, val[1]);
      return fin_res;
    }

    return fin();
  }

  function BFS_bomb(
    graph,
    hashmap,
    prevmap,
    start,
    target,
    class_name,
    class_name2
  ) {
    let numNode = 0;
    let timeDateBefore = new Date(Date.now());
    let bool_operation;
    let response = [];
    let queue = [start];
    let count = 0;
    let val = speedMeter();
    hashmap[`${start.x}-${start.y}`] = true;
    while (queue.length > 0) {
      count += 1;
      let c = queue.pop();
      refArray[c.x + c.y * 50].current.style["transition-delay"] = `${
        count * val[0]
      }ms`;
      refArray[c.x + c.y * 50].current.classList.add(class_name);
      refArray[c.x + c.y * 50].current.style[
        "animation"
      ] = `render-visited ${animationTime}s ease-out ${
        count * val[0]
      }ms alternate 1 forwards running`;
      if (c.x == bomb.current.x && c.y == bomb.current.y) {
        response.push(c, count, prevmap, val);
        bool_operation = true;
        numNode = count;
        break;
      }
      if (
        c.x + 1 < 50 &&
        !hashmap[`${c.x + 1}-${c.y}`] &&
        !graph[c.y][c.x + 1].iswall
      ) {
        queue.unshift({ x: c.x + 1, y: c.y });
        prevmap[`${c.x + 1}-${c.y}`] = { ...c };
        hashmap[`${c.x + 1}-${c.y}`] = true;
      }
      if (
        c.x - 1 >= 0 &&
        !hashmap[`${c.x - 1}-${c.y}`] &&
        !graph[c.y][c.x - 1].iswall
      ) {
        queue.unshift({ x: c.x - 1, y: c.y });
        prevmap[`${c.x - 1}-${c.y}`] = { ...c };
        hashmap[`${c.x - 1}-${c.y}`] = true;
      }
      if (
        c.y + 1 < 25 &&
        !hashmap[`${c.x}-${c.y + 1}`] &&
        !graph[c.y + 1][c.x].iswall
      ) {
        queue.unshift({ x: c.x, y: c.y + 1 });
        prevmap[`${c.x}-${c.y + 1}`] = { ...c };
        hashmap[`${c.x}-${c.y + 1}`] = true;
      }
      if (
        c.y - 1 >= 0 &&
        !hashmap[`${c.x}-${c.y - 1}`] &&
        !graph[c.y - 1][c.x].iswall
      ) {
        queue.unshift({ x: c.x, y: c.y - 1 });
        prevmap[`${c.x}-${c.y - 1}`] = { ...c };
        hashmap[`${c.x}-${c.y - 1}`] = true;
      }
      bool_operation = false;
    }
    let counter = 0;
    let newprevmap = {};
    let c = 0;
    function change() {
      let newhashmap = {};
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          newprevmap[`${j}-${i}`] = null;
          newhashmap[`${j}-${i}`] = false;
        }
      }
      newhashmap[`${bomb.current.x}-${bomb.current.y}`] = true;
      let q = [bomb.current];
      while (q.length > 0) {
        counter += 1;
        c = q.pop();
        refArray[c.x + c.y * 50].current.style["transition-delay"] = `${
          counter * val[0]
        }ms`;
        if (!refArray[c.x + c.y * 50].current.classList.contains(class_name)) {
          numNode += 1;
        }
        refArray[c.x + c.y * 50].current.classList.add(class_name2);
        refArray[c.x + c.y * 50].current.style[
          "animation"
        ] = `render-visited2 ${animationTime}s ease-out ${
          counter * val[0]
        }ms alternate 1 forwards running`;
        if (c.x == target.x && c.y == target.y) {
          response.push(c, counter, newprevmap);
          let timeDateAfter = new Date(Date.now());
          setRuntime(
            (
              timeDateAfter.getTime() -
              timeDateBefore.getTime() -
              count * val[0]
            ).toString()
          );
          setNumNodes(numNode);
          return true;
        }
        if (
          c.x + 1 < 50 &&
          !newhashmap[`${c.x + 1}-${c.y}`] &&
          !graph[c.y][c.x + 1].iswall
        ) {
          q.unshift({ x: c.x + 1, y: c.y });
          newprevmap[`${c.x + 1}-${c.y}`] = { ...c };
          newhashmap[`${c.x + 1}-${c.y}`] = true;
        }
        if (
          c.x - 1 >= 0 &&
          !newhashmap[`${c.x - 1}-${c.y}`] &&
          !graph[c.y][c.x - 1].iswall
        ) {
          q.unshift({ x: c.x - 1, y: c.y });
          newprevmap[`${c.x - 1}-${c.y}`] = { ...c };
          newhashmap[`${c.x - 1}-${c.y}`] = true;
        }
        if (
          c.y + 1 < 25 &&
          !newhashmap[`${c.x}-${c.y + 1}`] &&
          !graph[c.y + 1][c.x].iswall
        ) {
          q.unshift({ x: c.x, y: c.y + 1 });
          newprevmap[`${c.x}-${c.y + 1}`] = { ...c };
          newhashmap[`${c.x}-${c.y + 1}`] = true;
        }
        if (
          c.y - 1 >= 0 &&
          !newhashmap[`${c.x}-${c.y - 1}`] &&
          !graph[c.y - 1][c.x].iswall
        ) {
          q.unshift({ x: c.x, y: c.y - 1 });
          newprevmap[`${c.x}-${c.y - 1}`] = { ...c };
          newhashmap[`${c.x}-${c.y - 1}`] = true;
        }
      }
      return false;
    }
    function x() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(change);
        }, count * val[0]);
      });
    }

    var final_res = null;
    x().then(() => {
      if (change() === true && bool_operation) {
        final_res = response;
        return response;
      } else {
        return null;
      }
    });

    async function fin() {
      const fin_res = await x();
      pathApproval(final_res, val[1]);
      checkToRestart(rest + counter, val[1]);
      return fin_res;
    }

    return fin();
  }

  function BFS(graph, hashmap, prevmap, start, target, class_name) {
    let timeDateBefore = new Date(Date.now());
    let queue = [start];
    let count = 0;
    let val = speedMeter();
    hashmap[`${start.x}-${start.y}`] = true;
    while (queue.length > 0) {
      count += 1;
      let c = queue.pop();
      refArray[c.x + c.y * 50].current.style["transition-delay"] = `${
        count * val[0]
      }ms`;
      refArray[c.x + c.y * 50].current.classList.add(class_name);
      refArray[c.x + c.y * 50].current.style[
        "animation"
      ] = `render-visited ${animationTime}s ease-out ${
        count * val[0]
      }ms alternate 1 forwards running`;
      if (c.x == target.x && c.y == target.y) {
        let timeDateAfter = new Date(Date.now());
        setRuntime(
          (timeDateAfter.getTime() - timeDateBefore.getTime()).toString()
        );
        setNumNodes(count);
        return [c, count, val, prevmap];
      }
      if (
        c.x + 1 < 50 &&
        !hashmap[`${c.x + 1}-${c.y}`] &&
        !graph[c.y][c.x + 1].iswall
      ) {
        queue.unshift({ x: c.x + 1, y: c.y });
        prevmap[`${c.x + 1}-${c.y}`] = { ...c };
        hashmap[`${c.x + 1}-${c.y}`] = true;
      }
      if (
        c.x - 1 >= 0 &&
        !hashmap[`${c.x - 1}-${c.y}`] &&
        !graph[c.y][c.x - 1].iswall
      ) {
        queue.unshift({ x: c.x - 1, y: c.y });
        prevmap[`${c.x - 1}-${c.y}`] = { ...c };
        hashmap[`${c.x - 1}-${c.y}`] = true;
      }
      if (
        c.y + 1 < 25 &&
        !hashmap[`${c.x}-${c.y + 1}`] &&
        !graph[c.y + 1][c.x].iswall
      ) {
        queue.unshift({ x: c.x, y: c.y + 1 });
        prevmap[`${c.x}-${c.y + 1}`] = { ...c };
        hashmap[`${c.x}-${c.y + 1}`] = true;
      }
      if (
        c.y - 1 >= 0 &&
        !hashmap[`${c.x}-${c.y - 1}`] &&
        !graph[c.y - 1][c.x].iswall
      ) {
        queue.unshift({ x: c.x, y: c.y - 1 });
        prevmap[`${c.x}-${c.y - 1}`] = { ...c };
        hashmap[`${c.x}-${c.y - 1}`] = true;
      }
    }
    return null;
  }

  function BDS(graph, hashmap, prevmap, start, target, class_name) {
    let timeDateBefore = new Date(Date.now());
    let queue = [start];
    let count = 0;
    let val = speedMeter();
    hashmap[`${start.x}-${start.y}`] = true;
    while (queue.length > 0) {
      count += 1;
      let c = queue[0];
      queue.shift();
      refArray[c.x + c.y * 50].current.style["transition-delay"] = `${
        count * val[0]
      }ms`;
      refArray[c.x + c.y * 50].current.classList.add(class_name);
      refArray[c.x + c.y * 50].current.style[
        "animation"
      ] = `render-visited ${animationTime}s ease-out ${
        count * val[0]
      }ms alternate 1 forwards running`;
      if (c.x == target.x && c.y == target.y) {
        let timeDateAfter = new Date(Date.now());
        setRuntime(
          (timeDateAfter.getTime() - timeDateBefore.getTime()).toString()
        );
        setNumNodes(count);
        return [c, count, val, prevmap];
      }

      if (
        c.y + 1 < 25 &&
        !hashmap[`${c.x}-${c.y + 1}`] &&
        !graph[c.y + 1][c.x].iswall
      ) {
        queue.unshift({ x: c.x, y: c.y + 1 });
        prevmap[`${c.x}-${c.y + 1}`] = { ...c };
        hashmap[`${c.x}-${c.y + 1}`] = true;
      }
      if (
        c.x - 1 >= 0 &&
        !hashmap[`${c.x - 1}-${c.y}`] &&
        !graph[c.y][c.x - 1].iswall
      ) {
        queue.unshift({ x: c.x - 1, y: c.y });
        prevmap[`${c.x - 1}-${c.y}`] = { ...c };
        hashmap[`${c.x - 1}-${c.y}`] = true;
      }
      if (
        c.y - 1 >= 0 &&
        !hashmap[`${c.x}-${c.y - 1}`] &&
        !graph[c.y - 1][c.x].iswall
      ) {
        queue.unshift({ x: c.x, y: c.y - 1 });
        prevmap[`${c.x}-${c.y - 1}`] = { ...c };
        hashmap[`${c.x}-${c.y - 1}`] = true;
      }
      if (
        c.x + 1 < 50 &&
        !hashmap[`${c.x + 1}-${c.y}`] &&
        !graph[c.y][c.x + 1].iswall
      ) {
        queue.unshift({ x: c.x + 1, y: c.y });
        prevmap[`${c.x + 1}-${c.y}`] = { ...c };
        hashmap[`${c.x + 1}-${c.y}`] = true;
      }
    }
    return null;
  }

  useEffect(() => {
    if (algo != "") {
      setdrag((old) => {
        return !old;
      });
      setdrag2((old) => {
        return !old;
      });
    }

    let hashmap = {};
    let prevmap = {};
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        prevmap[`${j}-${i}`] = null;
        hashmap[`${j}-${i}`] = false;
      }
    }

    var val = speedMeter();
    var unweighted_algos = ["BFS", "BDS", "DFS"];

    if (unweighted_algos.includes(algo) || eraser) {
      let new_grid = grid.slice();
      let changes = false;
      let changes_eraser = false;
      grid.map((el) => {
        el.map((el) => {
          if (el.weight > 1) {
            changes = true;
            new_grid[el.y][el.x] = { ...new_grid[el.y][el.x], weight: 1 };
          } else if (el.iseraser) {
            changes_eraser = true;
            new_grid[el.y][el.x] = { ...new_grid[el.y][el.x], iseraser: false };
          }
        });
      });
      if (changes || changes_eraser) {
        setgrid(new_grid);
        if (changes) {
          seterror("This Algorithm isn't affected by weights.");
        }
      }
    }

    if (algo == "BFS") {
      if (bomb.current.x != null && bomb.current.y != null) {
        BFS_bomb(
          grid,
          hashmap,
          prevmap,
          start.current,
          end.current,
          "visited",
          "visited2"
        );
      } else {
        let result = BFS(
          grid,
          hashmap,
          prevmap,
          start.current,
          end.current,
          "visited"
        );
        pathApproval(result, val[0]);
      }
    } else if (algo == "BDS") {
      if (bomb.current.x != null && bomb.current.y != null) {
        seterror("This Algorithm doesn't support bombs");
        grid[bomb.current.y][bomb.current.x].isbomb = false;
        bomb.current = { x: null, y: null };
      }
      let result = BDS(
        grid,
        hashmap,
        prevmap,
        start.current,
        end.current,
        "visited"
      );
      pathApproval(result, val[0]);
    } else if (algo == "DFS") {
      let result = DFS(
        grid,
        hashmap,
        prevmap,
        start.current,
        end.current,
        "visited",
        "visited2"
      );
      pathApproval(result, val[0]);
    }

    checkToRestart(rest, val[1]);
  }, [run]);

  useEffect(() => {
    let getId = document.getElementById("start-btn-grid");
    refArray.forEach((elem) => {
      elem.current.style["transition-delay"] = "0ms";
    });
    refArray.forEach((elem) => {
      elem.current.classList.remove("visited");
      elem.current.classList.remove("visited2");
      elem.current.classList.remove("path");
      elem.current.style["backgroundColor"] = "white";
      getId.style.transform = "rotate(0deg)";
      elem.current.style["animation"] = "";
    });
  }, [res]);

  return (
    <div className="board">
      {refArray.map((elem, index) => {
        let classList = ["cell"];
        let indexY = Math.floor(index / 50);
        let indexX = index % 50;
        let mat = grid[indexY][indexX];

        return (
          <div
            key={`${index}`}
            ref={elem}
            className={classList.join(" ")}
            onMouseDown={() => {
              seteditFlag(true);
            }}
            onMouseUp={() => seteditFlag(false)}
            onMouseMove={() => {
              if (!editing) {
                return;
              }
              let current = grid[indexY][indexX];
              if (current.isstart || current.istarget || current.iseraser) {
                return;
              }
              switch (mode) {
                case "setstart":
                  var newgrid = grid.map((elem) => {
                    return elem.map((elem) => {
                      if (!elem.isstart) return elem;
                      return { ...elem, isstart: false };
                    });
                  });
                  newgrid[indexY][indexX] = {
                    ...newgrid[indexY][indexX],
                    isstart: true,
                    istarget: false,
                    weight: 1,
                    iswall: false,
                  };
                  start.current = { x: indexX, y: indexY };
                  setgrid(newgrid);
                  break;
                case "settarget":
                  var newgrid = grid.map((elem) => {
                    return elem.map((elem) => {
                      if (!elem.istarget) return elem;
                      return { ...elem, istarget: false };
                    });
                  });
                  newgrid[indexY][indexX] = {
                    ...newgrid[indexY][indexX],
                    isstart: false,
                    istarget: true,
                    weight: 1,
                    iswall: false,
                  };
                  end.current = { x: indexX, y: indexY };
                  setgrid(newgrid);
                  break;
                case "setwall":
                  if (!grid[indexY][indexX].isbomb) {
                    let new_grd = grid.slice();
                    new_grd[indexY][indexX] = {
                      ...new_grd[indexY][indexX],
                      weight: 1,
                      iswall: true,
                    };
                    setgrid(new_grd);
                  }
                  break;
                case "setweight":
                  if (!grid[indexY][indexX].isbomb) {
                    let new_grid = grid.slice();
                    new_grid[indexY][indexX] = {
                      ...new_grid[indexY][indexX],
                      weight: 5,
                      iswall: false,
                    };
                    setgrid(new_grid);
                  }
                  break;
                case "setbomb":
                  var newgrid = grid.map((el) => {
                    return el.map((el) => {
                      if (el.isbomb) {
                        return { ...el, isbomb: false };
                      } else {
                        return el;
                      }
                    });
                  });
                  newgrid[indexY][indexX] = {
                    ...newgrid[indexY][indexX],
                    isbomb: true,
                    iswall: false,
                    weight: 1,
                  };
                  bomb.current = { x: indexX, y: indexY };
                  setgrid(newgrid);
                  break;
                case "seteraser":
                  var newgrid = grid.map((el) => {
                    return el.map((el) => {
                      if (el.iseraser) {
                        return { ...el, iseraser: false };
                      } else {
                        return el;
                      }
                    });
                  });
                  newgrid[indexY][indexX] = {
                    ...newgrid[indexY][indexX],
                    iseraser: true,
                    isbomb: false,
                    iswall: false,
                    weight: 1,
                  };
                  if (indexY == bomb.current.y && indexX == bomb.current.x) {
                    bomb.current = { x: null, y: null };
                  }
                  setgrid(newgrid);
                  break;
                default:
                  return;
              }
            }}
          >
            {mat.iswall ? <img className="image-wall" src={Cube}></img> : null}
            {mat.weight > 1 ? (
              <img className="image-weight weighted" src={Weight}></img>
            ) : null}
            {mat.isstart ? (
              <img
                id="start-btn-grid"
                className="image-grid started"
                src={Start}
              ></img>
            ) : null}
            {mat.istarget ? (
              <img className="image-grid targetted" src={End}></img>
            ) : null}
            {mat.isbomb ? (
              <img className="image-grid bombed" src={bombs}></img>
            ) : null}
            {mat.iseraser ? (
              <img className="image-grid erased" src={erasers}></img>
            ) : null}
          </div>
        );
      })}
      <Tutorial></Tutorial>
      <ErrorMessage></ErrorMessage>
      <Metrics></Metrics>
      <Code></Code>
      <Panel></Panel>
    </div>
  );
};

export default Grid;
