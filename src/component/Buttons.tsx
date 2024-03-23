import { useState } from "react";
import { Calcs, Operator } from "./index";

type Rate = 10 | 100;

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
  const [floorFlg, setFloorFlg] = useState(false);

  /**
   * リセットボタンの処理：表示を0にする　cボタン
   */
	const resetHandler = () => {
    setDisplay("0");
    setAutoFlg(false);
    setFloorFlg(false);
    setCalcs({firstNum: 0, secondNum: 0, operator: ""});
  };

  /**
   * 計算ボタンの処理：計算結果を表示する　=ボタン
   */
  const calcHandler = () => {
    const answer = calcAnswer(calcs.firstNum, calcs.secondNum, calcs.operator as Operator);
    setDisplay(answer.toString());
    setAutoFlg(true);
    setCalcs({ firstNum: answer, secondNum: calcs.secondNum, operator: calcs.operator});
  }

  /**
   * 演算子ボタンの処理：演算子をセットする
   * @param op 演算子
   */
  const optHandler = (op: Operator) => {
    if (calcs.operator !== "" && calcs.secondNum !== 0) {
      const answer = calcAnswer(calcs.firstNum, calcs.secondNum, calcs.operator as Operator);
      setDisplay(answer.toString());
      setAutoFlg(true);
      setCalcs({ firstNum: answer, secondNum: 0, operator: op});
    } else {
      setCalcs({ ...calcs, operator: op });
    }
  }

  /**
   * 数字ボタンの処理：数字をセットする（整数）
   * @param num 数字
   * @param rate 割る数
   */
  const numBtnHandler = (num: number, rate: Rate) => {;
    let current_num = calcs.operator === "" ? calcs.firstNum : calcs.secondNum;
    if (num === 0 && current_num === 0) return;

    if (autoFlg) {
      setAutoFlg(false);
      current_num = 0;
    }

    current_num = current_num * rate + (num !== 0 ? num : 0);

    if (calcs.operator === "") {
      setCalcs({...calcs, firstNum: current_num });
    } else {
      setCalcs({...calcs, secondNum: current_num });
    }
  };

  const floorNumHandler = (num: number, rate: Rate) => {
    let current_num = calcs.operator === "" ? calcs.firstNum : calcs.secondNum;
    if (num === 0 && current_num === 0) return;

    if (autoFlg) {
      setAutoFlg(false);
      current_num = 0;
    }

    if ( current_num === 0) {
      current_num = num / rate;
    } else {
      current_num = current_num + (num !== 0 ? num / rate : 0);
    }

    if (calcs.operator === "") {
      setCalcs({...calcs, firstNum: current_num });
    } else {
      setCalcs({...calcs, secondNum: current_num });
    }
  };

  return (
    <div>
      {/* リセットボタン */}
      <button onClick={resetHandler}> C </button>

      {/* 数字ボタン */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "00", "."].map((num) => {
        return (
          <button key={num}
            onClick={() => {
              const rate = num === "00" ? 100 : 10;
              const n: number = typeof num === 'string' ? 0 : num;

              if (num === ".") {
                setFloorFlg(true);
                numBtnHandler(n, rate);
              } else {
                floorFlg
                  ? floorNumHandler(n, rate)
                  : numBtnHandler(n, rate);
              }
            }}
          >
            {num}
          </button>
        );
      })}

      {/* 演算子ボタン */}
      {["+", "-", "*", "/"].map((op) => {
        return (
          <button key={op} onClick={ optHandler.bind(null, op as Operator)}>
            {op}
          </button>
        );
      })}

      {/* =ボタン */}
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
  return answer === Infinity ? 0 : answer;
}