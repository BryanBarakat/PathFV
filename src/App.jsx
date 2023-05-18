import "./App.css";
import { NavBar } from "./components/NavBar/NavBar";
import { Grid } from "./components/Grid/Grid";
import { useParams } from "./components/context/Context";

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
      <Grid></Grid>
    </div>
  );
}

export default App;
