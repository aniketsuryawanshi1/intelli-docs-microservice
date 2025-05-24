import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-left">
        <div className="logo-section">
          <span role="img" aria-label="brain" className="logo-icon">
            🧠
          </span>
          <h1 className="project-name">DocIntel.AI</h1>
        </div>
        <p className="slogan">
          Interact With Your Documents Using AI — Upload PDFs, CSVs, PPTs, and
          ask questions with cutting-edge NLP technology.
        </p>
        <div className="button-group">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
          <button
            className="btn btn-outline"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>

      <div className="landing-right">
        <svg
          className="landing-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 600 400"
          fill="none"
          stroke="#1e88e5"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="300" cy="200" r="80" />
          <path d="M300 120v80l40 40" />
          <path d="M300 200h80" />
          <path d="M380 200l-40 40" />
          <path d="M220 280l80-80" />
          <path d="M180 200l40-40" />
          <path d="M300 280l-40-40" />
          <path d="M300 200l-80 80" />
          <path d="M380 120l-80 80" />
        </svg>
      </div>
    </div>
  );
};

export default LandingPage;
