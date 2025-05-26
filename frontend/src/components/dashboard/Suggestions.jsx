import React from "react";

const Suggestions = ({ projectSuggestions }) => (
  <ul className="suggestions hide-scrollbar">
    {projectSuggestions.map((s, idx) => (
      <li className="suggestions-item" key={idx}>
        <span className="icon material-symbols-rounded">{s.icon}</span>
        <p className="text">{s.title}</p>
        <p className="suggestion-tagline">{s.tagline}</p>
      </li>
    ))}
  </ul>
);

export default Suggestions;
