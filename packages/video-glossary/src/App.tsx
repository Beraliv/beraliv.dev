import "./App.css";
import { Search } from "./Search";
import { definitions } from "./definitions";

function App() {
  return (
    <>
      <h1>Definitions</h1>
      <Search definitions={definitions} />
    </>
  );
}

export default App;
