import { useState } from "react";
import Display from "./Display";
import Buttons from "./Buttons";
import { Calcs } from "./index";
import "../styles/App.css";

function App() {
  const [display, setDisplay] = useState<string>("0");
  const [calcs, setCalcs] = useState<Calcs>({firstNum: "0", secondNum: "0", operator: "_"});

	return (
    <div className="App">
      <div className="App-inner">
        <Display display={display} calcs={ calcs } />
        <Buttons setDisplay={setDisplay} calcs={calcs} setCalcs={setCalcs} />
      </div>
		</div>
	);
}
export default App;
