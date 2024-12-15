import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const TypeSection = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Type</h2>
      <p className="text-sm font-normal text-gray-500 mb-3">
        Choose only one options
      </p>
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-2 w-full">
          {hotelTypes.map((hotelType, i) => (
            <label
              key={i}
              className={`cursor-pointer text-sm rounded-full px-5 py-2 font-semibold transition-all border-[1px] ${
                typeWatch === hotelType
                  ? "bg-blue-700 border-transparent text-white"
                  : "bg-gray-100 hover:bg-gray-200 border-gray-300"
              } ${isExpanded ? "block" : i > 9 && "hidden"}`}
            >
              <input
                type="radio"
                value={hotelType}
                {...register("type", {
                  required: "This field is required",
                })}
                className="hidden"
              />
              <span>{hotelType}</span>
            </label>
          ))}
        </div>
        {isExpanded ? (
          <button
            onClick={() => setIsExpanded(false)}
            type="button"
            className="underline text-black font-semibold flex justify-center items-center"
          >
            View less <ChevronUp />
          </button>
        ) : (
          <button
            onClick={() => setIsExpanded(true)}
            type="button"
            className="underline text-black font-semibold flex justify-center items-center"
          >
            View more <ChevronDown />
          </button>
        )}
      </div>
      {errors.type && (
        <span className="text-red-500 font-semibold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
