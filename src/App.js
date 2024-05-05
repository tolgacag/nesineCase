import Basket from "./components/Basket";
import GameTable from "./components/GameTable";
import { GlobalProvider } from "./Contexts/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <GameTable />
      <Basket />
    </GlobalProvider>
  );
}

export default App;
