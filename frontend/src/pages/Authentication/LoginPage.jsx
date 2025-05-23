import React, { useState } from "react";
import {
  IconMail,
  IconKey,
  IconEye,
  IconEyeOff,
  IconArrowRight,
} from "@tabler/icons-react";
import "./LoginPage.css";
import LoginSVgPath from "../../assets/login.svg";

const LoginPage = () => {
  const [visible, setVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      alert("Logged in!");
    }, 2000);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img
          src={LoginSVgPath}
          alt="Login Illustration"
          className="login-svg"
        />
      </div>

      <div className="login-right">
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

        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-tagline">
            Welcome Back!{" "}
            <span className="wave-emoji" role="img" aria-label="wave">
              👋
            </span>
          </h2>

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
                placeholder="Your password"
                value={form.password}
                onChange={handleChange}
                required
                className="input-lg sm-radius no-border"
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

          <button type="submit" className="btn-login" disabled={visible}>
            <IconArrowRight size={20} className="btn-icon" />
            Login
          </button>

          <p className="register-prompt">
            Don’t have an account? <a href="/register">Register now</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
