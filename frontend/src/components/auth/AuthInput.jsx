import React from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

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
  IconComponent,
  ...rest
}) => (
  <div className="input-group">
    <label htmlFor={name}>
      {label} <span className="asterisk">*</span>
    </label>
    <div className="input-wrapper">
      {IconComponent && <IconComponent size={20} className="input-icon" />}
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
          {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
        </span>
      )}
    </div>
  </div>
);

export default AuthInput;
