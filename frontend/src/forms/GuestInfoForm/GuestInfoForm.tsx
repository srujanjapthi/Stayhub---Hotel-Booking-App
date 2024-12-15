import { Baby, Calendar, User2 } from "lucide-react";
import { useRef } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../contexts/AppContext";
import { useSearchContext } from "../../contexts/SearchContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const { isLoggedIn } = useAppContext();
  const search = useSearchContext();
  const location = useLocation();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const navigate = useNavigate();

  const checkInRef = useRef<DatePicker>(null);
  const checkOutRef = useRef<DatePicker>(null);

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
    );

    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
    );

    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className="flex flex-col p-4 bg-blue-100 gap-4 rounded-lg shadow-md">
      <h3 className="text-md font-bold">₹{pricePerNight}</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
        className="grid grid-cols-1 gap-4 items-center"
      >
        <div className="relative">
          <DatePicker
            required
            selected={checkIn}
            onChange={(date) => setValue("checkIn", date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-in date"
            className="min-w-full h-14 bg-white p-2 focus:outline-none rounded"
            wrapperClassName="min-w-full"
            ref={checkInRef}
          />

          <div
            className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"
            onClick={() => checkInRef.current?.setFocus()}
          >
            <Calendar className="text-gray-600" />
          </div>
        </div>

        <div className="relative">
          <DatePicker
            selected={checkOut}
            onChange={(date) => setValue("checkOut", date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-out date"
            className="min-w-full h-14 bg-white p-2 focus:outline-none rounded"
            wrapperClassName="min-w-full"
            ref={checkOutRef}
          />

          <div
            className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"
            onClick={() => checkOutRef.current?.setFocus()}
          >
            <Calendar className="text-gray-600" />
          </div>
        </div>

        <div className="flex justify-around bg-white py-2 rounded">
          <div className="flex items-center gap-1">
            <User2 size={20} className="ml-2 md:ml-3" />
            <label className="flex items-center">
              Adults:
              <input
                className="w-full h-10 p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                max={30}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
          </div>

          <div className="flex items-center gap-1 border-l-2">
            <Baby size={20} className="ml-2 md:ml-3" />
            <label className="flex items-center">
              Children:
              <input
                className="w-full h-10 p-1 focus:outline-none font-bold"
                type="number"
                min={0}
                max={30}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold">
                {errors.adultCount.message}
              </span>
            )}
          </div>
        </div>

        {isLoggedIn ? (
          <button className="bg-blue-700 text-white text-lg h-full p-2 rounded-lg font-semibold hover:bg-blue-800 transition-all duration-200">
            Book Now
          </button>
        ) : (
          <button className="bg-blue-700 text-white text-lg h-full p-2 rounded-lg font-semibold hover:bg-blue-800 transition-all duration-200">
            Sign in to book
          </button>
        )}
      </form>
    </div>
  );
};

export default GuestInfoForm;
