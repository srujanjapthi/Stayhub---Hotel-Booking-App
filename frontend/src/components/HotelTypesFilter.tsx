import { Check } from "lucide-react";
import { hotelTypes } from "../config/hotel-options-config";
import { useState } from "react";

type Props = {
  selectedHotelTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = ({ selectedHotelTypes, onChange }: Props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Types</h4>

      <div className="space-y-2 flex flex-col">
        {hotelTypes
          .slice(0, isExpanded ? hotelTypes.length : 8)
          .map((hotelType, index) => (
            <label
              key={index}
              className={`flex items-center justify-between border px-2 py-1 rounded transition-all duration-200 cursor-pointer ${
                selectedHotelTypes.includes(hotelType) && "bg-gray-100"
              }`}
            >
              <input
                type="checkbox"
                className="rounded"
                value={hotelType}
                checked={selectedHotelTypes.includes(hotelType)}
                onChange={onChange}
                hidden
              />
              <span>{hotelType}</span>
              {selectedHotelTypes.includes(hotelType) && <Check />}
            </label>
          ))}

        <button
          onClick={() => setIsExpanded((prevExpanded) => !prevExpanded)}
          className="text-center text-md font-semibold underline text-blue-800"
        >
          {isExpanded ? "View less" : "View more"}
        </button>
      </div>
    </div>
  );
};

export default HotelTypesFilter;
