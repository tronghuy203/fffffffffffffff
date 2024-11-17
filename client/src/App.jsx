import { EthProvider } from "./contexts/EthContext";
import Demo  from "./components/Demo";

function App() {
  console.log(process.env.REACT_APP_NETWORK_ID)
  console.log(process.env.REACT_APP_DEFAULT_RPC)
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <hr />
          <Demo/>
          <hr />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;