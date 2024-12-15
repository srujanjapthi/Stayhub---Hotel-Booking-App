import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Guests</h2>
      <p className="text-sm font-normal text-gray-500 mb-3">
        Select Guests: Adults and Children
      </p>
      <div className="grid grid-cols-2 py-4 px-4 md:px-6 gap-5 bg-gray-100 rounded-xl">
        <label className="text-gray-700 text-sm font-semibold">
          Adults
          <input
            type="number"
            className={`border rounded w-full py-1 px-2 font-normal outline-none ${
              errors.adultCount && "border-red-500"
            }`}
            min={1}
            {...register("adultCount", {
              required: "This field is required",
            })}
          />
          {errors.adultCount && (
            <span className="text-red-500 font-semibold">
              {errors.adultCount.message}
            </span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-semibold">
          Children
          <input
            type="number"
            className={`border rounded w-full py-1 px-2 font-normal outline-none ${
              errors.childCount && "border-red-500"
            }`}
            min={0}
            {...register("childCount", {
              required: "This field is required",
            })}
          />
          {errors.childCount && (
            <span className="text-red-500 font-semibold">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
