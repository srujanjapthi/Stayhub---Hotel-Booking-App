import { Star } from "lucide-react";
import { HotelType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

type Props = {
  hotel: HotelType;
};

const SearchResultCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[3fr_3fr] border border-slate-300 rounded-lg p-4 md:p-6 gap-8 hover:bg-slate-100 md:hover:shadow-md transition-all duration-200 group">
      <div className="w-full h-[180px] sm:h-[270px] md:h-[300px] overflow-hidden rounded-lg">
        <img
          src={hotel.imageUrls[0]}
          alt={`${hotel.name}_img_${0}`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-200"
        />
      </div>
      <div className="flex flex-col gap-7 md:grid md:grid-rows-[1fr_2fr_1fr]">
        <div className="flex flex-row-reverse items-center justify-between max-md:flex-col max-md:justify-normal max-md:items-start">
          <div className="flex flex-row-reverse md:flex-row items-center">
            <span className="mx-2 text-gray-700 text-sm">{hotel.type}</span>
            <span className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={17}
                  className={`text-yellow-400 ${
                    index < hotel.starRating && "fill-yellow-400"
                  }`}
                />
              ))}
            </span>
          </div>
          <Link
            to={`/detail/${hotel._id}`}
            className="text-xl md:text-2xl font-bold cursor-pointer"
          >
            {hotel.name}
          </Link>
        </div>

        <div>
          <div className="line-clamp-4 max-md:text-sm">{hotel.description}</div>
        </div>

        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 1).map((facility, index) => (
              <span
                key={index}
                className="bg-slate-200 shadow-sm border border-slate-300 p-2 rounded-lg font-semibold text-xs whitespace-nowrap"
              >
                {facility}
              </span>
            ))}
            <span className="text-xs">
              {hotel.facilities.length > 1 &&
                `+${hotel.facilities.length - 1} more`}
            </span>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="font-semibold max-sm:text-sm">
              ₹{hotel.pricePerNight} per night
            </span>
            <Link
              to={`/detail/${hotel._id}`}
              className="bg-blue-700 text-white h-full p-2 font-semibold text-md sm:text-xl max-w-fit rounded-md hover:bg-blue-800 transition-all duration-300"
            >
              View more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
