import { useState } from "react";
import { Calcs, Operator } from "./index";

type Rate = 10 | 100;
type Type = "*" | "/";

function Buttons({
  setDisplay,
  calcs,
  setCalcs,
}: {
    setDisplay: (display: string) => void;
    calcs: Calcs;
    setCalcs: (calcs: Calcs) => void;
  }) {
    const [autoFlg, setAutoFlg] = useState(false);

	const resetHandler = () => {
		setDisplay("0");
    setCalcs({firstNum: 0, secondNum: 0, operator: ""});
  };

  const calcHandler = () => {
    const answer = calcAnswer(calcs.firstNum, calcs.secondNum, calcs.operator as Operator);
    setDisplay(answer.toString());
    setAutoFlg(true);
    setCalcs({ firstNum: answer, secondNum: calcs.secondNum, operator: calcs.operator});
  }


  const optHandler = (op: Operator) => {
    if (calcs.operator !== "" && calcs.operator !== op) {
      const answer = calcAnswer(calcs.firstNum, calcs.secondNum, calcs.operator as Operator);
      setDisplay(answer.toString());
      setAutoFlg(true);
      setCalcs({ firstNum: answer, secondNum: 0, operator: op});
    } else {
      setCalcs({ ...calcs, operator: op });
    }
  }

  const numBtnHandler = (num: number | string) => {
    const rate: Rate = num === "00" ? 100 : 10;
    const type: Type = num === "." ? "/" : "*";
    num = typeof num === 'string' ? 0 : num;

    let current_num = calcs.operator === "" ? calcs.firstNum : calcs.secondNum;

    if (num === 0 && current_num === 0) return;
    if (autoFlg) {
      setAutoFlg(false);
      current_num = 0;
    }
    if (type === "*") current_num = current_num * rate + (num !== 0 ? num : 0);
    if (type === "/") current_num = current_num / rate + (num !== 0 ? num : 0);

    if (calcs.operator === "") {
      setCalcs({...calcs, firstNum: current_num });
		} else {
      setCalcs({...calcs, secondNum: current_num });
    }
  };

  return (
    <div>
      <button onClick={resetHandler}> C </button>

      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "00", "."].map((num) => {
        return (
          <button key={num}
            onClick={numBtnHandler.bind(null, num)}
          >
            {num}
          </button>
        );
      })}

      {["+", "-", "*", "/"].map((op) => {
        return (
          <button key={op} onClick={ optHandler.bind(null, op as Operator)}>
            {op}
          </button>
        );
      })}

      <button onClick={calcHandler}> = </button>
    </div>
  );
}
export default Buttons;


function calcAnswer(firstNum: number, secondNum: number, operator: Operator) {
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
  return answer;
}