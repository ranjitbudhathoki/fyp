import React, { useState } from 'react';

function InputField({ label, value, onChange, ...rest }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="input-field">
      <label className={isFocused || value ? 'active' : ''}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
    </div>
  );
}

export default InputField;
