import React, { useState, useEffect } from "react";
import "../styles/defaults.scss";
import "./Popup.scss";
import TextBlock from "../components/TextBlock/TextBlock";

import { BsMicFill as MicOnIcon } from "react-icons/bs";
import { BsMicMuteFill as MicOffIcon } from "react-icons/bs";
import { BiDotsVerticalRounded as SettingsIcon } from "react-icons/bi";

function App() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState([]);

  useEffect(() => {
    console.log(transcript);
    // update transcript in chrome.storage
  }, [transcript]);

  return (
    <div className="Popup">
      <div className="Popup-Header">
        <h1>Voice to Text</h1>
      </div>

      <div className="Popup-Transcript">
        {transcript.length > 0 ? (
          transcript.map((data, index) => {
            return <TextBlock {...data} key={index} />;
          })
        ) : (
          <div className="Popup-Transcript-Empty">
            No text to show yet.
            <br />
            Press the button below to start...
          </div>
        )}
      </div>

      <div className="Popup-Controls">
        <button className="Popup-Controls-Mic">
          {recording ? <MicOffIcon /> : <MicOnIcon />}
        </button>

        <button className="Popup-Controls-Settings">
          <SettingsIcon />
        </button>
      </div>
    </div>
  );
}

export default App;
