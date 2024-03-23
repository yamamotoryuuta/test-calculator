import { useState } from "react";
import Display from "./Display";
import Buttons from "./Buttons";
import { Calcs } from "./index";
import "../styles/App.css";

function App() {
  const [display, setDisplay] = useState<string>("0");
  const [calcs, setCalcs] = useState<Calcs>({firstNum: 0, secondNum: 0, operator: ""});

	return (
    <div className="App">
      <Display display={display} calcs={ calcs } />
      <Buttons setDisplay={setDisplay} calcs={calcs} setCalcs={setCalcs} />
		</div>
	);
}
export default App;
