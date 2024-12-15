import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/swiper-bundle.css";

const Detail = () => {
  const { hotelId } = useParams();

  const { data: hotel, isLoading } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    { enabled: !!hotelId },
  );

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!hotel) {
    return <>Oops!!! something went wrong...</>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
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
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>

      <div>
        <Swiper
          className="flex items-center justify-center rounded-lg overflow-hidden"
          pagination={{
            clickable: true,
            renderBullet: (_, className) =>
              `<span class="${className} w-2 h-2 bg-gray-300 rounded-full mx-1 transition-transform transform duration-300"></span>`,
          }}
          modules={[Pagination, Navigation, Autoplay]}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: true }}
          spaceBetween={5}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          breakpoints={{
            1023: {
              slidesPerView: 2,
            },
          }}
        >
          <button className="custom-prev text-gray-100 transition-all duration-200 hover:text-gray-300 absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
            <ChevronLeft size={35} />
          </button>
          <button className="custom-next text-gray-100 transition-all duration-200 hover:text-gray-300 absolute right-2 top-1/2 transform -translate-y-1/2 z-10">
            <ChevronRight size={35} />
          </button>

          {hotel.imageUrls.map((image, index) => (
            <SwiperSlide key={index} className="w-full aspect-[16/9]">
              <img
                src={image}
                alt={hotel.name}
                className="w-full h-full rounded-lg object-cover object-center"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex flex-wrap gap-2">
        {hotel.facilities.map((facility) => (
          <div className="border border-slate-300 rounded-md px-3 py-1 max-md:text-xs text-sm font-semibold bg-slate-200 shadow-sm">
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <div className="whitespace-pre-line text-justify">
          {hotel.description}
        </div>
        <div className="h-fit">
          <GuestInfoForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
