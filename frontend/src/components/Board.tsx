export default function Board() {
  let board = [];
  for (let i = 7; i >= 0; i--) {
    for (let j = 0; j < 8; j++) {
      const number = i + j + 2;
      if (number % 2 === 0) {
        board.push(<div className="bg-[#769656]"></div>);
      } else {
        board.push(<div className="bg-[#eeeed2]"></div>);
      }
    }
  }
  console.log(board);
  return <div className="size-[100vh] mx-auto grid grid-cols-8 grid-rows-8">{board}</div>;
}
