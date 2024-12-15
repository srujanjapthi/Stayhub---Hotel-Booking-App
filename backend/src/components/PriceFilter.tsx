// type Props = {
//   selectedPrice?: number;
//   onChange: (value?: number) => void;
// };

// const PriceFilter = ({ selectedPrice, onChange }: Props) => {
//   return (
//     <div>
//       <h4 className="text-md font-semibold mb-2">Max Price</h4>
//       <select
//         className="p-2 border rounded-md w-full"
//         value={selectedPrice}
//         onChange={(event) =>
//           onChange(
//             event.target.value ? parseInt(event.target.value) : undefined
//           )
//         }
//       >
//         <option value="">Select Max Price</option>
//         {[100, 500, 1000, 2000, 3000, 5000, 10000].map((price, index) => (
//           <option key={index} value={price}>
//             {price}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default PriceFilter;

import Select, { SingleValue } from "react-select";

type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  const priceOptions = [
    { value: 100, label: "100" },
    { value: 500, label: "500" },
    { value: 1000, label: "1000" },
    { value: 2000, label: "2000" },
    { value: 3000, label: "3000" },
    { value: 5000, label: "5000" },
    { value: 10000, label: "10000" },
  ];

  const handleChange = (
    selectedOption: SingleValue<{ value: number; label: string }>,
  ) => {
    onChange(
      selectedOption?.value
        ? parseInt(selectedOption.value.toString(), 10)
        : undefined,
    );
  };

  return (
    <div>
      <h4 className="text-md font-semibold mb-2">Max Price</h4>
      <Select
        className="w-full"
        options={priceOptions}
        value={priceOptions.find((option) => option.value === selectedPrice)}
        onChange={handleChange}
        isClearable
        isSearchable
        placeholder="Select Max Price"
      />
    </div>
  );
};

export default PriceFilter;
