import React, { useState } from "react";

import Select from "react-select";

const options = [
  { value: "low-to-high", label: "Price (Low to high)" },
  { value: "high-to-low", label: "Price (High to low)" },
];
const CheckBox = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const customOptionRenderer = ({ data, isSelected }) => (
    <div>
      <input type="checkbox" checked={isSelected} readOnly />
      <span>{data.label}</span>
    </div>
  );
  return (
    <div>
      {/* <label htmlFor="sort-dropdown">Sort By</label> */}
      <Select
        id="sort-dropdown"
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder="Select sorting option"
        isOptionSelected={(option) => option.value === selectedOption.value}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        components={{ Option: customOptionRenderer }}
      />
    </div>
  );
};

export default CheckBox;
