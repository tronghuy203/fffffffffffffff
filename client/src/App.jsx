import { EthProvider } from "./contexts/EthContext";
import  Demo  from "./components/Demo";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  return (
    <EthProvider>
          <Demo/>
    </EthProvider>
  );
}

export default App;
