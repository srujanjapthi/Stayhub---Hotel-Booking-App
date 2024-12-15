import { Check } from "lucide-react";

type Props = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Property Rating</h4>
      <div className="space-y-2">
        {["5", "4", "3", "2", "1"].map((star, index) => (
          <label
            key={index}
            className={`flex items-center justify-between border px-2 py-1 rounded transition-all duration-200 cursor-pointer ${
              selectedStars.includes(star) && "bg-gray-100"
            }`}
          >
            <input
              type="checkbox"
              className="rounded"
              value={star}
              checked={selectedStars.includes(star)}
              onChange={onChange}
              hidden
            />
            <span>{star} Stars</span>
            {selectedStars.includes(star) && <Check />}
          </label>
        ))}
      </div>
    </div>
  );
};

export default StarRatingFilter;
