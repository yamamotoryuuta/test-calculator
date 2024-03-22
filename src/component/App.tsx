import { useState, useEffect } from "react";
import "../styles/App.css";

type Operator = "+" | "-" | "*" | "/" | "";
type calcs = {
  firstNum: number;
  secondNum: number;
  operator: Operator;
};

function App() {
	const [display, setDisplay] = useState<string>("0");
  const [currentNum, setCurrentNum] = useState<number>(0);
  const [calcs, setCalcs] = useState<calcs>({firstNum: 0, secondNum: 0, operator: ""});

	const resetHndler = () => {
		setDisplay("0");
    setCurrentNum(0);
    setCalcs({firstNum: 0, secondNum: 0, operator: ""});
  };

	const setNumber = (num: number) => {
    const current_num = calcs.operator === "" ? calcs.firstNum! : calcs.secondNum!;
		if (num === 0 && current_num === 0) return;

		setCurrentNum(current_num * 10 + (num !== 0 ? num : 0));
  };

  useEffect(() => {
    if (calcs.operator === "") {
      setCalcs({...calcs, firstNum: currentNum });
		} else {
      setCalcs({...calcs, secondNum: currentNum });
    }

    setDisplay(currentNum.toString());
  },[currentNum]);

	return (
		<div className="App">
			<p>
				合計: {display} <span>{calcs.operator}</span>
			</p>
			<button onClick={resetHndler}> C・CE</button>

			{[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "00", "."].map((num) => {
				return (
					<button
						key={num}
            onClick={() => {
              if (num === "." || num === "00") {
                console.log("num", num);
              } else  {
                typeof num === 'number' && setNumber(num);
              }
						}}
					>
						{num}
					</button>
				);
			})}

			{["+", "-", "*", "/"].map((op) => {
				return (
					<button
						key={op}
						onClick={() => {
							setCalcs({ ...calcs, operator: op as Operator});
						}}
					>
						{op}
					</button>
				);
			})}

			<button
				onClick={() => {
					let answer = 0;
					if (calcs.operator === "+") {
						answer = calcs.firstNum! + calcs.secondNum!;
					} else if (calcs.operator === "-") {
						answer = calcs.firstNum! - calcs.secondNum!;
					} else if (calcs.operator === "*") {
						answer = calcs.firstNum! * calcs.secondNum!;
					} else if (calcs.operator === "/") {
						answer = calcs.firstNum! / calcs.secondNum!;
					}
					setDisplay(answer.toString());
					setCalcs({ firstNum: answer, secondNum: 0, operator: calcs.operator});
				}}
			>
				=
			</button>
		</div>
	);
}

export default App;
