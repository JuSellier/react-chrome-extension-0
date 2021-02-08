import React from "react";
import "./Options.scss";
import "../styles/defaults.scss";

function Options() {
  return (
    <div className="Options">
      <header className="Options-Header">
        <h1>Options</h1>
      </header>

      <main className="Options-Main">
        <div className="Options-Main-Language">
          <label htmlFor="language">Select your preferred language</label>
          <select id="language">
            <option value="fr-FR">French</option>
            <option value="en-US">English</option>
          </select>
        </div>
      </main>
    </div>
  );
}

export default Options;
