import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/auth/authThunks"; // Adjust path as needed
import { useNavigate } from "react-router-dom";
import AuthInput from "./AuthInput";
import LoadingOverlay from "./LoadingOverlay";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.password2) {
      // You can set a local error state here if you want
      return;
    }
    dispatch(register(form))
      .unwrap()
      .then(() => navigate("/"))
      .catch(() => {});
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-tagline">Register</h2>
      {loading && <LoadingOverlay />}
      {error && <p className="error">{error}</p>}
      <AuthInput
        label="Username"
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        required
      />
      <AuthInput
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <AuthInput
        label="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        required
        showToggle
        showPassword={showPassword}
        onToggle={() => setShowPassword((v) => !v)}
      />
      <AuthInput
        label="Confirm Password"
        type="password"
        name="password2"
        value={form.password2}
        onChange={handleChange}
        required
        showToggle
        showPassword={showPassword2}
        onToggle={() => setShowPassword2((v) => !v)}
      />
      <button type="submit" className="btn-auth" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
