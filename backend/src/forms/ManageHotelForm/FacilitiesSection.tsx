import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelFacilities } from "../../config/hotel-options-config";
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const FacilitiesSection = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Facilities</h2>
      <p className="text-sm font-normal text-gray-500 mb-3">
        Choose one or more options
      </p>
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 w-full">
          {hotelFacilities
            .slice(0, isExpanded ? hotelFacilities.length : 8)
            .map((facility, i) => (
              <label
                key={i}
                className="bg-gray-100 border-[1px] border-gray-300 px-5 py-2 rounded-full font-semibold text-sm cursor-pointer flex justify-between items-center"
              >
                <input
                  type="checkbox"
                  value={facility}
                  className="hidden"
                  {...register("facilities", {
                    validate: (facilities) => {
                      if (!facilities || facilities.length === 0) {
                        return "At least one facility is required";
                      }
                    },
                  })}
                />
                {facility}
                {watch("facilities") &&
                  watch("facilities").includes(facility) && (
                    <CheckCircle className="text-green-600" />
                  )}
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
      {errors.facilities && (
        <span className="text-red-500 font-semibold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
