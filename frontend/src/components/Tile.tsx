interface Props {
  image?: string;
  number: number;
}

export default function Tile({ image, number }: Props) {
  const isDark = number % 2 === 0; // Check if the tile is dark or light

  return (
    <div className={isDark ? "bg-[#769656]" : "bg-[#eeeed2]"}>
      {image && <img draggable="false" className="piece" src={image} alt="" />}
    </div>
  );
}
