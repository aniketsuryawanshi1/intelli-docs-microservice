import React from "react";

const AuthInput = ({
  label,
  type,
  name,
  value,
  onChange,
  required,
  showToggle,
  showPassword,
  onToggle,
  ...rest
}) => (
  <div className="input-group">
    <label htmlFor={name}>
      {label} <span className="asterisk">*</span>
    </label>
    <div className="input-wrapper">
      <input
        type={showToggle && showPassword ? "text" : type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="input-lg no-border"
        {...rest}
      />
      {showToggle && (
        <span
          className="toggle-password"
          onClick={onToggle}
          style={{ cursor: "pointer" }}
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
      )}
    </div>
  </div>
);

export default AuthInput;
