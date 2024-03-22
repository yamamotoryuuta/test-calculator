import { useState } from "react";
import "../styles/App.css";

function App() {
	const [display, setDisplay] = useState<string>("0");
	const [firstNum, setFirstNum] = useState<number>(0);
	const [secondNum, setSecondNum] = useState<number>(0);
	const [operator, setOperator] = useState<string>("");

	const resetHndler = () => {
		setFirstNum(0);
		setSecondNum(0);
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

		let push_num = 0;
		if (num === 0 && current_num === 0) {
			return;
		} else if (num === 0 && current_num !== 0) {
			push_num = current_num * 10;
		} else {
			push_num = current_num * 10 + num;
		}

		if (operator === "") {
			setFirstNumHandler(push_num);
			setDisplay(push_num.toString());
		} else {
			setSecondNumHandler(push_num);
			setDisplay(push_num.toString());
		}
	};

	return (
		<div className="App">
			<p>
				合計: {display} <span>{operator}</span>
			</p>
			<button onClick={resetHndler}> C・CE</button>

			{[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => {
				return (
					<button
						key={num}
						onClick={() => {
							setNumber(num);
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
							// setDisplay(op);
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
