import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  hotel: HotelType;
  className?: string;
};

const LatestDestinationCard = ({ hotel, className }: Props) => {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className={className || ""}>
        <img
          src={hotel.imageUrls[0]}
          alt={`img_0_${hotel.name}`}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md flex justify-center">
        <span className="text-white font-semibold tracking-tight text-2xl">
          {hotel.name}
        </span>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
