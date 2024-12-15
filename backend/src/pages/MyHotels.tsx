import { Building2, Leaf, LucideEye, Map, Star, Tag } from "lucide-react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as apiClient from "../api-client";

const MyHotels = () => {
  const { data: hotelData, isLoading } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    { onError: () => {} },
  );

  const [expandedHotels, setExpandedHotels] = useState<{
    [key: string]: boolean;
  }>({});

  const limitText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return {
        trimmedText: words.slice(0, wordLimit).join(" ") + "...",
        isTrimmed: true,
      };
    }
    return { trimmedText: text, isTrimmed: false };
  };

  const toggleExpanded = (hotelId: string) => {
    setExpandedHotels((prev) => ({
      ...prev,
      [hotelId]: !prev[hotelId],
    }));
  };

  if (isLoading) {
    return <span>Fetching hotel information...</span>;
  }

  if (!hotelData) {
    return <span>No Hotels Found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex items-center justify-between">
        <h1 className="text-2xl font-bold md:text-3xl">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex gap-2 items-center bg-blue-700 text-white text-md md:text-xl font-semibold py-2 px-4 rounded-lg transition hover:bg-blue-800"
        >
          <Building2 />
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-4 md:gap-8">
        {hotelData.map((hotel) => {
          const { trimmedText, isTrimmed } = limitText(hotel.description, 50);
          const isExpanded = expandedHotels[hotel._id] || false;

          return (
            <div
              key={hotel._id}
              className="flex flex-col justify-between border border-slate-300 rounded-lg p-5 md:p-8 gap-3 md:gap-5 bg-zinc-50 shadow-sm"
            >
              <h2 className="text-2xl font-bold">{hotel.name}</h2>
              <div className="text-[15px] text-justify whitespace-pre-line">
                {isExpanded ? hotel.description : trimmedText}
                {isTrimmed && (
                  <button
                    onClick={() => toggleExpanded(hotel._id)}
                    className="text-blue-500 underline ml-2"
                  >
                    {isExpanded ? "Read less" : "Read more"}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                <div className="font-medium bg-slate-50 border border-slate-300 rounded-md p-3 flex items-center select-none hover:bg-gray-100 transition-all shadow-sm">
                  <Map className="mr-2 size-4 border-right" />
                  {hotel.city}, {hotel.country}
                </div>
                <div className="font-medium bg-slate-50 border border-slate-300 rounded-md p-3 flex items-center select-none hover:bg-gray-100 transition-all shadow-sm">
                  <Leaf className="mr-2 size-4 border-right" />
                  {hotel.type}
                </div>
                <div className="font-medium bg-slate-50 border border-slate-300 rounded-md p-3 flex items-center select-none hover:bg-gray-100 transition-all shadow-sm">
                  <Tag className="mr-2 size-4 border-right" />₹
                  {hotel.pricePerNight} per night
                </div>
                <div className="font-medium bg-slate-50 border border-slate-300 rounded-md p-3 flex items-center select-none hover:bg-gray-100 transition-all shadow-sm">
                  <Building2 className="mr-2 size-4 border-right" />
                  {hotel.adultCount} Adults, {hotel.childCount} Children
                </div>
                <div className="font-medium bg-slate-50 border border-slate-300 rounded-md p-3 flex items-center select-none hover:bg-gray-100 transition-all shadow-sm">
                  <Star className="mr-2 size-4 border-right" />
                  {hotel.starRating} Star Rating
                </div>
              </div>
              <span className="flex justify-end">
                <Link
                  to={`/edit-hotel/${hotel._id}`}
                  className="flex gap-2 items-center bg-blue-700 text-white text-sm font-semibold py-2 px-3 rounded-lg transition hover:bg-blue-800"
                >
                  <LucideEye className="w-4" />
                  View Details
                </Link>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyHotels;
