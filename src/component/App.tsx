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
  const [operator, setOperator] = useState<Operator>("");
  const [calcs, setCalcs] = useState<calcs>({firstNum: 0, secondNum: 0, operator: ""});

	const resetHndler = () => {
    setCurrentNum(0);
		setOperator("");
		setDisplay("0");
  };


	const setOperatorHandler = (op: Operator) => {
		setOperator(op);
	};

	const setNumber = (num: number) => {
    const current_num = operator === "" ? calcs.firstNum : calcs.secondNum;
		if (num === 0 && current_num === 0) return;

		setCurrentNum(current_num * 10 + (num !== 0 ? num : 0));
  };

  useEffect(() => {
    if (calcs.operator === "") {
			setCalcs({firstNum: currentNum, secondNum: calcs.secondNum, operator: calcs.operator});
		} else {
      setCalcs({firstNum: calcs.firstNum, secondNum: currentNum, operator: operator});
    }

    setDisplay(currentNum.toString());
  },[currentNum]);

	return (
		<div className="App">
			<p>
				合計: {display} <span>{operator}</span>
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
							setOperatorHandler(op as Operator);
						}}
					>
						{op}
					</button>
				);
			})}

			<button
				onClick={() => {
					let answer = 0;
					if (operator === "+") {
						answer = calcs.firstNum + calcs.secondNum;
					} else if (operator === "-") {
						answer = calcs.firstNum - calcs.secondNum;
					} else if (operator === "*") {
						answer = calcs.firstNum * calcs.secondNum;
					} else if (operator === "/") {
						answer = calcs.firstNum / calcs.secondNum;
					}
					setDisplay(answer.toString());
					setCalcs({firstNum: answer, secondNum: 0, operator: calcs.operator});
				}}
			>
				=
			</button>
		</div>
	);
}

export default App;
