import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import getMatrix from "../../utils/NodeMatrix";

const context = createContext();

export const useParams = () => {
  return useContext(context);
};

export const Context = ({ children }) => {
  const [algo, setalgo] = useState("");
  const [mode, setmode] = useState(null);
  const [editing, seteditFlag] = useState(false);
  const [run, setrun] = useState(false);
  const [res, setres] = useState(false);
  const [grid, setgrid] = useState(getMatrix(25, 50));
  const [speed, setspeed] = useState("Slow");
  const [tut, settut] = useState("page1");
  const [error, seterror] = useState("");
  const [eraser, seteraser] = useState(false);
  const [drag, setdrag] = useState(true);
  const [drag2, setdrag2] = useState(true);
  const [metrics, setmetrics] = useState(false);
  const [config, setconfig] = useState(false);
  const [runtime, setRuntime] = useState("");
  const [numNodes, setNumNodes] = useState(0);
  const [pathNodes, setPathNodes] = useState(0);
  const [content, setcontent] = useState(
    <div>
      <h5>Help Panel</h5>
      <br />
      <span>
        <h5>
          The help panel is here to make things easier while first using the
          software, every button in the navigation bar has a role, you can click
          on one of them and then double click and drag on the grid.
        </h5>
      </span>
    </div>
  );
  const [minimode, setminimode] = useState("");
  const start = useRef({ x: 25, y: 12 });
  const end = useRef({ x: 48, y: 23 });
  const bomb = useRef({ x: null, y: null });

  const restart = () => {
    setgrid(getMatrix(25, 50));
    setmetrics(false);
    if (!drag) {
      setdrag(true);
    }
    if (!drag2) {
      setdrag2(true);
    }
    setconfig(false);
    bomb.current = { x: null, y: null };
    start.current = { x: 25, y: 12 };
    end.current = { x: 48, y: 23 };
  };

  useEffect(() => {
    restart();
  }, [res]);

  const MemoizedObjects = useMemo(() => {
    return {
      algo,
      setalgo,
      mode,
      setmode,
      editing,
      seteditFlag,
      run,
      setrun,
      res,
      setres,
      grid,
      setgrid,
      start,
      end,
      speed,
      setspeed,
      tut,
      settut,
      error,
      seterror,
      bomb,
      seteraser,
      eraser,
      drag,
      setdrag,
      minimode,
      setminimode,
      content,
      setcontent,
      config,
      setconfig,
      drag2,
      setdrag2,
      metrics,
      setmetrics,
      runtime,
      setRuntime,
      numNodes,
      setNumNodes,
      pathNodes,
      setPathNodes,
    };
  }, [
    algo,
    setalgo,
    mode,
    setmode,
    editing,
    seteditFlag,
    run,
    setrun,
    res,
    setres,
    grid,
    setgrid,
    start,
    end,
    speed,
    setspeed,
    tut,
    settut,
    error,
    seterror,
    bomb,
    seteraser,
    eraser,
    drag,
    setdrag,
    minimode,
    setminimode,
    content,
    setcontent,
    config,
    setconfig,
    drag2,
    setdrag2,
    metrics,
    setmetrics,
    runtime,
    setRuntime,
    numNodes,
    setNumNodes,
    pathNodes,
    setPathNodes,
  ]);

  return (
    <div>
      <context.Provider value={MemoizedObjects}>{children}</context.Provider>
    </div>
  );
};

export default Context;
