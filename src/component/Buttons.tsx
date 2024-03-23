import { useState } from "react";
import { Calcs, Operator } from "./index";

type PrevBtn = "" | "=" | "opt";

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
  const [prev, setPrev] = useState<PrevBtn>('');

  /**
   * リセットボタンの処理：表示を0にする　cボタン
   */
	const resetHandler = () => {
    setDisplay("0");
    setAutoFlg(false);
    setFloorFlg(false);
    setCalcs({firstNum: "0", secondNum: "0", operator: "_"});
  };

  /**
   * 計算ボタンの処理：計算結果を表示する　=ボタン
   */
  const calcHandler = () => {
    const answer = calcAnswer(calcs.firstNum, calcs.secondNum, calcs.operator as Operator);
    setDisplay(answer.toString());
    setAutoFlg(true);
    setPrev("=");
    setCalcs({ firstNum: answer.toString(), secondNum: calcs.secondNum, operator: calcs.operator});
  }

  /**
   * 演算子ボタンの処理：演算子をセットする
   * @param op 演算子
   */
  const optHandler = (op: Operator) => {
    if (calcs.operator !== "_" && calcs.secondNum !== "0") {
      if (prev === "opt") {
        const answer = calcAnswer(calcs.firstNum, calcs.secondNum, calcs.operator as Operator);
        setDisplay(answer.toString());
        setAutoFlg(true);
        setCalcs({ firstNum: answer.toString(), secondNum: "0", operator: op });
      } else if (prev === "=") {
        setCalcs({ firstNum: calcs.firstNum, secondNum: "0", operator: op });
      }
    } else {
      setCalcs({ ...calcs, operator: op });
    }
    setPrev("opt");
  }

  /**
   * 数字ボタンの処理：数字をセットする（整数）
   * @param num 数字
   * @param rate 割る数
   */
  const numBtnHandler = (num: string) => {;
    let current_num: string = calcs.operator === "_" ? calcs.firstNum : calcs.secondNum;
    if (num === "0" && current_num === "0") return;

    if (autoFlg) {
      setAutoFlg(false);
      current_num = "0";
    }
    current_num = current_num === "0" ? num : current_num + num;

    if (calcs.operator === "_") {
      setCalcs({...calcs, firstNum: current_num });
    } else {
      setCalcs({...calcs, secondNum: current_num });
    }
  };

  // const floorNumHandler = (num: number, rate: Rate) => {
  //   let current_num = calcs.operator === "" ? calcs.firstNum : calcs.secondNum;
  //   if (num === 0 && current_num === 0) return;

  //   if (autoFlg) {
  //     setAutoFlg(false);
  //     current_num = 0;
  //   }

  //   if ( current_num === 0) {
  //     current_num = num / rate;
  //   } else {
  //     current_num = current_num + (num !== 0 ? num / rate : 0);
  //   }

  //   if (calcs.operator === "") {
  //     setCalcs({...calcs, firstNum: current_num });
  //   } else {
  //     setCalcs({...calcs, secondNum: current_num });
  //   }
  // };

  const NumberMarge = (text: string) => {

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
              if (num === ".") {
                setFloorFlg(true);
                // numBtnHandler(n, rate);
              } else {
                // floorFlg
                //   ? floorNumHandler(n, rate)
                //   : numBtnHandler(num.toString());
                  numBtnHandler(num.toString());
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


function calcAnswer(firstNum: string, secondNum: string, operator: Operator) {
  const firstNumInt = parseFloat(firstNum);
  const secondNumInt = parseFloat(secondNum);

  let answer = 0;
  if (operator === "+") {
    answer = firstNumInt + secondNumInt;
  } else if (operator === "-") {
    answer = firstNumInt - secondNumInt;
  } else if (operator === "*") {
    answer = firstNumInt * secondNumInt;
  } else if (operator === "/") {
    answer = firstNumInt / secondNumInt;
  }
  return answer === Infinity ? 0 : answer;
}