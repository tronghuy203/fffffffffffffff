import { useState } from "react";
import Contract from "./Contract";
import ContractBtns from "./ContractBtns";


function Demo() {
  const [value, setValue] = useState("?");

  return (
    <div className="demo">
      <div className="contract-container">
        <Contract value={value} />
        <ContractBtns setValue={setValue} />
      </div>
    </div>
  );
}

export default Demo;