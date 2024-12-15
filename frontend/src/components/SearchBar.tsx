import { FormEvent, useRef, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { Baby, Calendar, Globe, User2 } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const checkInRef = useRef<DatePicker>(null);
  const checkOutRef = useRef<DatePicker>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount,
    );

    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();

  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 max-md:mx-5 p-1 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 2xl:grid-cols-5 items-center gap-1"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2 rounded">
        <Globe size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full h-10 focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
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
              value={adultCount}
              onChange={(event) => setAdultCount(event.target.valueAsNumber)}
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
              value={childCount}
              onChange={(event) => setChildCount(event.target.valueAsNumber)}
            />
          </label>
        </div>
      </div>

      <div className="relative">
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
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
          onChange={(date) => setCheckOut(date as Date)}
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

      <div className="flex gap-1 h-14 sm:col-span-2 2xl:col-span-1">
        <button
          type="submit"
          className="w-2/3 h-full bg-blue-600 text-white p-2 font-semibold text-[1.2rem] hover:bg-blue-700 rounded transition-all duration-300"
        >
          Search
        </button>
        <button
          type="reset"
          className="w-1/3 h-full bg-red-500 text-white p-2 font-semibold text-[1.2rem] hover:bg-red-600 rounded transition-all duration-300"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
