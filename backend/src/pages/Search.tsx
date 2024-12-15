import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";
import SortOptions from "../components/SortOptions";
import { ChevronDown, ChevronUp } from "lucide-react";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const searchParams: apiClient.SearchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams),
  );

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating),
    );
  };

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prevHotelTypes) =>
      event.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((prevHoteltype) => prevHoteltype !== hotelType),
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility),
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[270px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit lg:sticky max-lg:mb-5 top-10 max-h-[90vh] overflow-y-scroll shadow-md">
        <div className="space-y-5">
          <div
            className={`flex justify-between items-center text-lg font-semibold ${
              isExpanded && "border-b border-slate-300 pb-5"
            }`}
          >
            <h3>Filter by:</h3>
            {isExpanded ? (
              <ChevronUp
                className="w-7 h-7 p-1 cursor-pointer rounded border border-slate-300"
                onClick={() => setIsExpanded(false)}
              />
            ) : (
              <ChevronDown
                className="w-7 h-7 p-1 cursor-pointer rounded border border-slate-300"
                onClick={() => setIsExpanded(true)}
              />
            )}
          </div>

          {isExpanded && (
            <>
              <StarRatingFilter
                selectedStars={selectedStars}
                onChange={handleStarsChange}
              />
              <HotelTypesFilter
                selectedHotelTypes={selectedHotelTypes}
                onChange={handleHotelTypeChange}
              />
              <FacilitiesFilter
                onChange={handleFacilityChange}
                selectedFacilities={selectedFacilities}
              />
              <PriceFilter
                selectedPrice={selectedPrice}
                onChange={(value?: number) => setSelectedPrice(value)}
              />
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between max-md:flex-col max-md:gap-3 items-center">
          <span className="text-xl font-bold text-gray-800">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? (
              <>
                {" "}
                in{" "}
                <span className="text-gray-500 underline font-semibold">
                  {search.destination}
                </span>
              </>
            ) : (
              ""
            )}
          </span>
          <SortOptions
            sortOption={sortOption}
            onChange={(value: string) => setSortOption(value)}
          />
        </div>

        {hotelData?.data.map((hotel, index) => (
          <SearchResultCard key={index} hotel={hotel} />
        ))}

        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
