import React from 'react';

function SelectField({ label, value, onChange, options, ...rest }) {
  return (
    <div className="select-field">
      <label>{label}</label>
      <select value={value} onChange={onChange} {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
