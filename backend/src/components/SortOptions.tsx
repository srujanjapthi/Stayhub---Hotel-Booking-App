import Select, { SingleValue } from "react-select";

type Props = {
  sortOption: string;
  onChange: (value: string) => void;
};

const SortOptions = ({ sortOption, onChange }: Props) => {
  const priceOptions = [
    { value: "starRating", label: "Star Rating" },
    { value: "pricePerNightAsc", label: "Price Per Night (Low to High)" },
    { value: "pricePerNightDesc", label: "Price Per Night (High to Low)" },
  ];

  const handleChange = (
    selectedOption: SingleValue<{ value: string; label: string }>,
  ) => {
    onChange(selectedOption?.value || "");
  };

  return (
    <Select
      className="w-72"
      options={priceOptions}
      value={priceOptions.find((option) => option.value === sortOption)}
      onChange={handleChange}
      isClearable
      isSearchable
      placeholder="Sort By"
    />
  );
};

export default SortOptions;
