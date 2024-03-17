import { ReactNode } from "react";
import Tile from "./Tile";

interface Piece {
  image: string;
  x: number;
  y: number;
}

const pieces: Piece[] = [];

for (let i = 0; i < 8; i++) {
  pieces.push({
    image: "https://images.chesscomfiles.com/chess-themes/pieces/light/150/bp.png",
    x: 6,
    y: i,
  });
}
for (let i = 0; i < 8; i++) {
  pieces.push({
    image: "https://images.chesscomfiles.com/chess-themes/pieces/light/150/wp.png",
    x: 1,
    y: i,
  });
}

for (let p = 0; p < 8; p++) {
  const type = p === 0 ? "b" : "w";
  const x = p === 0 ? 7 : 0;

  const pieceTypes = ["b", "n", "b", "q", "k", "b", "n", "r"];

  for (let y = 0; y < pieceTypes.length; y++) {
    pieces.push({
      image: `https://images.chesscomfiles.com/chess-themes/pieces/light/150/${type}${pieceTypes[y]}.png`,
      x,
      y,
    });
  }
}

export default function Board() {
  let board: ReactNode[] = [];
  for (let i = 7; i >= 0; i--) {
    for (let j = 0; j < 8; j++) {
      const number = i + j + 2;
      let image = undefined;

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });

      board.push(<Tile image={image} number={number} />);
    }
  }
  return <div className="size-[100vh] mx-auto grid grid-cols-8 grid-rows-8">{board}</div>;
}
