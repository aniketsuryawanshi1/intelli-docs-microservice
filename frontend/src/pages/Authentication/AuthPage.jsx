import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";
import LoginSVGPath from "../../assets/login.svg";
import RegisterSVG from "../../assets/Secure-login.svg";
import "./AuthPage.css";
import { useLocation } from "react-router-dom";

const AuthPage = () => {
  const location = useLocation();
  const isRegister = location.pathname.includes("register");

  return (
    <div className="auth-container">
      <div className="auth-left">
        <img
          src={isRegister ? RegisterSVG : LoginSVGPath}
          alt={isRegister ? "Register Illustration" : "Login Illustration"}
          className="auth-svg"
        />
      </div>
      <div className="auth-right">
        {isRegister ? <RegisterForm /> : <LoginForm />}
      </div>
    </div>
  );
};

export default AuthPage;
