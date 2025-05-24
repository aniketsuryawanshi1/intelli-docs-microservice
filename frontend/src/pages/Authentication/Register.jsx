import React, { useState } from "react";
import {
  IconUser,
  IconMail,
  IconKey,
  IconEye,
  IconEyeOff,
  IconArrowRight,
} from "@tabler/icons-react";
import RegisterSVG from "../../assets/Secure-login.svg"; // Use your register illustration here
import "./Register.css";

const Register = () => {
  const [visible, setVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.password2) {
      alert("Passwords do not match!");
      return;
    }
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      alert("Registered successfully!");
      // Here you can redirect or clear form
    }, 2000);
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <img
          src={RegisterSVG}
          alt="Register Illustration"
          className="register-svg"
        />
      </div>

      <div className="register-right">
        {visible && (
          <div className="custom-loading-overlay">
            <div className="dot-spinner">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}

        <form className="register-form" onSubmit={handleSubmit}>
          <h2 className="register-tagline">
            Create your account{" "}
            <span className="wave-emoji" role="img" aria-label="wave">
              ✨
            </span>
          </h2>

          <div className="input-group">
            <label htmlFor="username">
              Username <span className="asterisk">*</span>
            </label>
            <div className="input-wrapper">
              <IconUser size={20} className="input-icon" />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Choose a username"
                value={form.username}
                onChange={handleChange}
                required
                className="input-lg sm-radius no-border"
                autoComplete="username"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email">
              Email <span className="asterisk">*</span>
            </label>
            <div className="input-wrapper">
              <IconMail size={20} className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                required
                className="input-lg sm-radius no-border"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">
              Password <span className="asterisk">*</span>
            </label>
            <div className="input-wrapper">
              <IconKey size={20} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
                className="input-lg sm-radius no-border"
                autoComplete="new-password"
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IconEyeOff size={20} />
                ) : (
                  <IconEye size={20} />
                )}
              </span>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password2">
              Confirm Password <span className="asterisk">*</span>
            </label>
            <div className="input-wrapper">
              <IconKey size={20} className="input-icon" />
              <input
                type={showPassword2 ? "text" : "password"}
                id="password2"
                name="password2"
                placeholder="Confirm your password"
                value={form.password2}
                onChange={handleChange}
                required
                className="input-lg sm-radius no-border"
                autoComplete="new-password"
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword2(!showPassword2)}
              >
                {showPassword2 ? (
                  <IconEyeOff size={20} />
                ) : (
                  <IconEye size={20} />
                )}
              </span>
            </div>
          </div>

          <button type="submit" className="btn-register" disabled={visible}>
            <IconArrowRight size={20} className="btn-icon" />
            Register
          </button>

          <p className="login-prompt">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
