import { Calcs } from "./index";
import "../styles/Display.css";

function Display({ display, calcs }: { display: string; calcs: Calcs }) {
	const operatorStyle = calcs.operator === "_" ? "display__operator" : "display__operator display__operator--active";

	return (
		<div className="display-block">
			<p>{calcs.firstNum}</p>
			<p className={ operatorStyle }>{calcs.operator}</p>
			<p>{calcs.secondNum}</p>
			<p className="display__operator display__operator--active">=</p>
			<p>{display}</p>
		</div>
	);
}
export default Display;
