import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const MyBookings = () => {
  const { data: hotels } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings,
  );

  if (!hotels || hotels.length === 0) {
    return <span>No bookings found</span>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {hotels.map((hotel) => (
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_3fr] border border-slate-300 rounded-lg p-4 lg:p-6 gap-5 shadow-sm hover:bg-gray-50 duration-300 transition-all">
          <div className="aspect-[16/9] max-h-[300px] flex justify-center w-full lg:h-[250px]">
            <img
              src={hotel.imageUrls[0]}
              alt={`img_0_${hotel.name}`}
              className="w-full h-full object-cover object-center rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-2xl font-bold">
              {hotel.name}
              <div className="text-xs font-normal">
                {hotel.city}, {hotel.country}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 overflow-y-auto max-h-[200px] bg-gray-50 shadow-sm p-3 rounded-lg">
              {hotel.bookings.map((booking) => (
                <div className="border border-slate-300 px-3 py-2 rounded text-sm text-gray-700 select-none">
                  <div>
                    <span className="font-bold mr-2">Dates: </span>
                    <span>
                      {new Date(booking.checkIn).toDateString()} -{" "}
                      {new Date(booking.checkOut).toDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold mr-2">Guests:</span>
                    <span>
                      {booking.adultCount} Adults, {booking.childCount} Children
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
