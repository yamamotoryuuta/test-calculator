import { useState, useEffect } from "react";
import Display from "./Display";
import Buttons from "./Buttons";
import "../styles/App.css";

type Operator = "+" | "-" | "*" | "/" | "";
type Rate = 10 | 100;
type Type = "*" | "/";
type calcs = {
  firstNum: number;
  secondNum: number;
  operator: Operator;
};

/**
 * TODO:
 * ２、小数点機能の追加
 * 3, 0を押した時の処理、
 */

function App() {
	const [display, setDisplay] = useState<string>("0");
  const [currentNum, setCurrentNum] = useState<number>(0);
  const [calcs, setCalcs] = useState<calcs>({firstNum: 0, secondNum: 0, operator: ""});

	const resetHndler = () => {
		setDisplay("0");
    setCurrentNum(0);
    setCalcs({firstNum: 0, secondNum: 0, operator: ""});
  };

	const setNumber = (num: number, type: Type = '*', rate: Rate = 10) => {
    let current_num = calcs.operator === "" ? calcs.firstNum! : calcs.secondNum!;
		if (num === 0 && current_num === 0) return;

    if (type === "*") current_num = current_num * rate + (num !== 0 ? num : 0);
    if (type === "/") current_num = current_num / rate + (num !== 0 ? num : 0);
    console.log(current_num);
		setCurrentNum(current_num);
  };

  useEffect(() => {
    if (calcs.operator === "") {
      setCalcs({...calcs, firstNum: currentNum });
		} else {
      setCalcs({...calcs, secondNum: currentNum });
    }

    setDisplay(currentNum.toString());
  }, [currentNum]);

  const numBtnHandler = (num: number | string) => {
    const rate: Rate = num === "00" ? 100 : 10;
    const type: Type = num === "." ? "/" : "*";
    num = typeof num === 'string' ? 0 : num;

    setNumber(num, type, rate);
  };

	return (
    <div className="App">
      <Display />
      <Buttons />
			<p>
				合計: {display} <span>{calcs.operator}</span>
			</p>
			<button onClick={resetHndler}> C・CE</button>

			{[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "00", "."].map((num) => {
				return (
					<button
						key={num}
            onClick={numBtnHandler.bind(null, num)}
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
