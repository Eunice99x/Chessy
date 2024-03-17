interface Props {
  image: string;
  number: number;
}

export default function Tile({ image, number }: Props) {
  if (number % 2 === 0) {
    return (
      <div className="bg-[#769656]">
        <img src={image} alt="" />
      </div>
    );
  } else {
    return (
      <div className="bg-[#eeeed2]">
        <img src={image} alt="" />
      </div>
    );
  }
}
