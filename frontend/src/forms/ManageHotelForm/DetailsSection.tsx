import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-3">
        <h1 className="text-3xl font-bold mb-1">Add Hotel</h1>
        <p className="text-md font-normal text-gray-500">
          Add a new hotel with details, images, and guest capacity for easy
          bookings.
        </p>
      </div>

      <label className="text-gray-700 text-sm font-semibold flex-1">
        Name
        <input
          type="text"
          className={`border rounded w-full py-1 px-2 font-normal outline-none ${
            errors.name && "border-red-500"
          }`}
          {...register("name", {
            required: "This field is required",
          })}
        />
        {errors.name && (
          <span className="text-red-500 font-semibold">
            {errors.name.message}
          </span>
        )}
      </label>

      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-semibold flex-1">
          City
          <input
            type="text"
            className={`border rounded w-full py-1 px-2 font-normal outline-none ${
              errors.city && "border-red-500"
            }`}
            {...register("city", {
              required: "This field is required",
            })}
          />
          {errors.city && (
            <span className="text-red-500 font-semibold">
              {errors.city.message}
            </span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-semibold flex-1">
          Country
          <input
            type="text"
            className={`border rounded w-full py-1 px-2 font-normal outline-none ${
              errors.country && "border-red-500"
            }`}
            {...register("country", {
              required: "This field is required",
            })}
          />
          {errors.country && (
            <span className="text-red-500 font-semibold">
              {errors.country.message}
            </span>
          )}
        </label>
      </div>

      <label className="text-gray-700 text-sm font-semibold flex-1">
        Description
        <textarea
          rows={10}
          className={`border rounded w-full py-1 px-2 font-normal outline-none resize-none ${
            errors.description && "border-red-500"
          }`}
          {...register("description", {
            required: "This field is required",
          })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500 font-semibold">
            {errors.description.message}
          </span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-semibold w-full sm:max-w-[50%]">
        Price Per Night
        <input
          type="number"
          min={1}
          className={`border rounded w-full py-1 px-2 font-normal outline-none ${
            errors.pricePerNight && "border-red-500"
          }`}
          {...register("pricePerNight", {
            required: "This field is required",
          })}
        />
        {errors.pricePerNight && (
          <span className="text-red-500 font-semibold">
            {errors.pricePerNight.message}
          </span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-semibold w-full sm:max-w-[50%]">
        Star Rating
        <select
          {...register("starRating", {
            required: "This field is required",
          })}
          className={`border rounded w-full p-2 font-normal outline-none ${
            errors.pricePerNight && "border-red-500"
          }`}
        >
          <option value="" className="text-sm font-semibold">
            Select a Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500 font-semibold">
            {errors.starRating.message}
          </span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
