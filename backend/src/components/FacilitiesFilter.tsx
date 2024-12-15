import { Check } from "lucide-react";
import { hotelFacilities } from "../config/hotel-options-config";
import { useState } from "react";

type Props = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Facilities</h4>

      <div className="space-y-2 flex flex-col">
        {hotelFacilities
          .slice(0, !isExpanded ? 8 : hotelFacilities.length)
          .map((hotelFacility, index) => (
            <label
              key={index}
              className={`flex items-center justify-between border px-2 py-1 rounded transition-all duration-200 cursor-pointer ${
                selectedFacilities.includes(hotelFacility) && "bg-gray-100"
              }`}
            >
              <input
                type="checkbox"
                className="rounded"
                value={hotelFacility}
                checked={selectedFacilities.includes(hotelFacility)}
                onChange={onChange}
                hidden
              />
              <span>{hotelFacility}</span>
              {selectedFacilities.includes(hotelFacility) && <Check />}
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

export default FacilitiesFilter;
