import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import AuthInput from "./AuthInput";
import LoadingOverlay from "./LoadingOverlay";
import { IconUserCircle, IconMail, IconKey } from "@tabler/icons-react";
import Swal from "sweetalert2";
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
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }
    dispatch(registerUser(form))
      .unwrap()
      .then(() => {
        Swal.fire(
          "Success",
          "Registration successful! Please login.",
          "success"
        );
        navigate("/login");
      })
      .catch((err) => {
        Swal.fire(
          "Error",
          err?.message || err || "Registration failed",
          "error"
        );
      });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-tagline">
        Create your account{" "}
        <span className="wave-emoji" role="img" aria-label="wave">
          ✨
        </span>
      </h2>
      {loading && <LoadingOverlay />}
      {error && Swal.fire("Error", error, "error")}
      <AuthInput
        label="Username"
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        IconComponent={IconUserCircle}
        required
      />
      <AuthInput
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
        IconComponent={IconMail}
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
        IconComponent={IconKey}
      />
      <AuthInput
        label="Confirm Password"
        id="password2"
        type="password"
        name="password2"
        value={form.password2}
        onChange={handleChange}
        required
        showToggle
        showPassword={showPassword2}
        onToggle={() => setShowPassword2((v) => !v)}
        IconComponent={IconKey}
      />
      <button type="submit" className="btn-auth" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>

      <p className="login-prompt">
        Already have an account? <a href="/login">Login here</a>
      </p>
    </form>
  );
};

export default RegisterForm;
