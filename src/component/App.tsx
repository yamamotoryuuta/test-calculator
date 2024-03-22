import { useState, useEffect } from "react";
import "../styles/App.css";

function App() {
	const [display, setDisplay] = useState<string>("0");
	const [firstNum, setFirstNum] = useState<number>(0);
  const [secondNum, setSecondNum] = useState<number>(0);
  const [currentNum, setCurrentNum] = useState<number>(0);
	const [operator, setOperator] = useState<string>("");

	const resetHndler = () => {
		setFirstNum(0);
    setSecondNum(0);
    setCurrentNum(0);
		setOperator("");
		setDisplay("0");
  };

	const setFirstNumHandler = (num: number) => {
		setFirstNum(num);
	};
	const setSecondNumHandler = (num: number) => {
		setSecondNum(num);
	};
	const setOperatorHandler = (op: string) => {
		setOperator(op);
	};

	const setNumber = (num: number) => {
    const current_num = operator === "" ? firstNum : secondNum;
		if (num === 0 && current_num === 0) return;

		setCurrentNum(current_num * 10 + (num !== 0 ? num : 0));
  };

  useEffect(() => {
    if (operator === "") {
			setFirstNumHandler(currentNum);
		} else {
      setSecondNumHandler(currentNum);
    }

    setDisplay(currentNum.toString());
  },[currentNum, operator]);

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
							setOperatorHandler(op);
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
						answer = firstNum + secondNum;
					} else if (operator === "-") {
						answer = firstNum - secondNum;
					} else if (operator === "*") {
						answer = firstNum * secondNum;
					} else if (operator === "/") {
						answer = firstNum / secondNum;
					}
					setDisplay(answer.toString());
					setFirstNumHandler(answer);
				}}
			>
				=
			</button>
		</div>
	);
}

export default App;
