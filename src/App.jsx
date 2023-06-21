import "./App.css";
import { NavBar } from "./components/NavBar/NavBar";
import { Grid } from "./components/Grid/Grid";
import { useParams } from "./components/context/Context";
import Tutorial from "./components/Tutorial/Tutorial";

function App() {
  const { error, seterror } = useParams();

  return (
    <div
      className="App"
      onMouseMove={() => {
        setTimeout(() => {
          if (error != "") {
            seterror("");
          }
        }, 1500);
      }}
    >
      <NavBar></NavBar>
      <Tutorial></Tutorial>
      <Grid></Grid>
    </div>
  );
}

export default App;
