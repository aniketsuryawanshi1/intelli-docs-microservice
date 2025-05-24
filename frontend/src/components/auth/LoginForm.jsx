import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authThunks"; // Adjust path as needed
import { useNavigate } from "react-router-dom";
import AuthInput from "./AuthInput";
import LoadingOverlay from "./LoadingOverlay";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form))
      .unwrap()
      .then(() => navigate("/"))
      .catch(() => {});
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-tagline">Login</h2>
      {loading && <LoadingOverlay />}
      {error && <p className="error">{error}</p>}
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
      <button type="submit" className="btn-auth" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
