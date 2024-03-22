import React, { ReactNode, useEffect, useRef } from "react";
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

  const pieceTypes = ["r", "n", "b", "q", "k", "b", "n", "r"];

  for (let y = 0; y < pieceTypes.length; y++) {
    pieces.push({
      image: `https://images.chesscomfiles.com/chess-themes/pieces/light/150/${type}${pieceTypes[y]}.png`,
      x,
      y,
    });
  }
}

export default function Board() {
  const boardRef = useRef<HTMLDivElement>(null);

  let activePiece: HTMLElement | null = null;
  let offsetX = 0;
  let offsetY = 0;

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;

    if (element.classList.contains("piece")) {
      offsetX = e.clientX - element.getBoundingClientRect().left;
      offsetY = e.clientY - element.getBoundingClientRect().top;

      activePiece = element;
    }
  }

  function movePiece(e: React.MouseEvent) {
    const boardTable = boardRef.current?.getBoundingClientRect();
    if (activePiece && boardTable) {
      const pieceWidth = activePiece.getBoundingClientRect().width;
      const pieceHeight = activePiece.getBoundingClientRect().height;

      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;

      // Ensure the piece stays within the boundaries of the board
      x = Math.max(boardTable.left, Math.min(boardTable.right - pieceWidth, x));
      y = Math.max(boardTable.top, Math.min(boardTable.bottom - pieceHeight, y));

      activePiece.style.left = `${x}px`;
      activePiece.style.top = `${y}px`;
      activePiece.style.position = "absolute";
      activePiece.style.width = "74.88px";
    }
  }

  function dropPiece(e: React.MouseEvent) {
    if (activePiece) {
      activePiece = null;
    }
  }

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

      board.push(<Tile key={`${i}, ${j}`} image={image} number={number} />);
    }
  }
  return (
    <div
      onMouseDown={(e) => grabPiece(e)}
      onMouseMove={(e) => movePiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      ref={boardRef}
      className="board size-[100vh] mx-auto grid grid-cols-8 grid-rows-8"
    >
      {board}
    </div>
  );
}
