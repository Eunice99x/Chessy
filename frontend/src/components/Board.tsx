import React, { ReactNode, useEffect, useRef, useState } from "react";
import Tile from "./Tile";

interface Piece {
  image: string;
  x: number;
  y: number;
}

const initialBoardState: Piece[] = [];

for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "b" : "w";
  const y = p === 0 ? 7 : 0;

  const pieceTypes = ["r", "n", "b", "q", "k", "b", "n", "r"];

  for (let x = 0; x < pieceTypes.length; x++) {
    initialBoardState.push({
      image: `https://images.chesscomfiles.com/chess-themes/pieces/light/150/${type}${pieceTypes[x]}.png`,
      x,
      y,
    });
  }
}

for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: "https://images.chesscomfiles.com/chess-themes/pieces/light/150/bp.png",
    x: i,
    y: 6,
  });
}
for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: "https://images.chesscomfiles.com/chess-themes/pieces/light/150/wp.png",
    x: i,
    y: 1,
  });
}

export default function Board() {
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
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
    const chessBoard = boardRef.current;
    if (activePiece && chessBoard) {
      const minX = chessBoard.offsetLeft - 25;
      const minY = chessBoard.offsetTop - 25;
      const maxX = chessBoard.offsetLeft + chessBoard.clientWidth - 75;
      const maxY = chessBoard.offsetTop + chessBoard.clientHeight - 75;

      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";
      activePiece.style.width = "74.88px";

      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }
      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  }

  function dropPiece(e: React.MouseEvent) {
    const chessBoard = boardRef.current;
    if (activePiece && chessBoard) {
      const x = Math.floor((e.clientX - chessBoard.offsetLeft) / 74.88);
      const y = Math.abs(Math.ceil((e.clientY - chessBoard.offsetTop - 599) / 74.88));

      console.log(x, y);

      setPieces((value) => {
        const pieces = value.map((p) => {
          // the condition in the if is white night
          if (p.x === 1 && p.y === 0) {
            p.x = x;
            p.y = y;
          }
          return p;
        });
        return pieces;
      });

      activePiece = null;
    }
  }

  let board: ReactNode[] = [];
  for (let j = 7; j >= 0; j--) {
    for (let i = 0; i < 8; i++) {
      const number = j + i + 2;
      let image = undefined;

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });

      board.push(<Tile key={`${j}, ${i}`} image={image} number={number} />);
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
