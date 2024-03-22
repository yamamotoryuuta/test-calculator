
function Display({
  display,
  operator,
}: {
    display: string;
    operator: string;
}) {
  return (
    <p>
    合計: {display} <span>{operator}</span>
    </p>
  )
}
export default Display;