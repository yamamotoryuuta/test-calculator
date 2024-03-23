import { Calcs } from "./index";

function Display({ display, calcs }: { display: string; calcs: Calcs }) {
	return (
		<div>
			<p>{calcs.firstNum}</p>
			<p>{calcs.operator}</p>
			<p>{calcs.secondNum}</p>
			<p>{display}</p>
		</div>
	);
}
export default Display;
