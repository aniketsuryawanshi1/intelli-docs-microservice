import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import AuthInput from "./AuthInput";
import LoadingOverlay from "./LoadingOverlay";
import { IconUserCircle, IconKey, IconArrowRight } from "@tabler/icons-react";
import Swal from "sweetalert2";
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
    dispatch(loginUser(form))
      .unwrap()
      .then(() => {
        Swal.fire("Success", "Login successful!", "success");
        navigate("/dashboard");
      })
      .catch((err) => {
        Swal.fire("Error", err?.message || err || "Login failed", "error");
      });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-tagline">
        Welcome Back!{" "}
        <span className="wave-emoji" role="img" aria-label="wave">
          👋
        </span>
      </h2>
      {loading && <LoadingOverlay />}
      {error && <p className="error">{error}</p>}
      <AuthInput
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
        IconComponent={IconUserCircle} // <-- pass user icon here
      />
      <AuthInput
        label="Password"
        id="password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        required
        showToggle
        showPassword={showPassword}
        onToggle={() => setShowPassword((v) => !v)}
        IconComponent={IconKey} // <-- pass key icon here
      />
      <button type="submit" className="btn-auth" disabled={loading}>
        <IconArrowRight size={20} className="btn-icon" />
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="register-prompt">
        Don’t have an account? <a href="/register">Register now</a>
      </p>
    </form>
  );
};

export default LoginForm;
