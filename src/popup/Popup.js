import React, { useState, useEffect } from "react";
import "../styles/defaults.scss";
import "./Popup.scss";
import TextBlock from "../components/TextBlock/TextBlock";

import { BsMicFill as MicOnIcon } from "react-icons/bs";
import { BsMicMuteFill as MicOffIcon } from "react-icons/bs";
import { RiSettings3Fill as SettingsIcon } from "react-icons/ri";

function Popup() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState([]);

  useEffect(() => {
    console.log(transcript);
    // update transcript in chrome.storage

    setTranscript(() => [
      {
        text:
          "Ttest texttest texttest texttest texttest texttest texttest texttest texttest texttest texttest textst texttest texttest texttest text",
        date: "12/01/2020",
        time: "12:00",
      },
      {
        text:
          "Ttest texttest texttest texttest texttest texttest texttest texttest texttest texttest texttest textst texttest texttest texttest text",
        date: "11/01/2020",
        time: "12:00",
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function micClick() {
    console.log(recording);
    if (recording) {
      setRecording(() => false);
    } else {
      setRecording(() => true);
      newSpeechRec();
    }
  }

  function newSpeechRec() {
    console.log("new speech rec called");
    const speechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;
    if (!speechRecognition) {
      return console.log("Speech recognition is undefined");
    }
    const recognition = new speechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = function (event) {
      console.log(event, "rec started");
    };

    recognition.onresult = function (event) {
      console.log(event, "rec result");
    };
    recognition.onerror = function (event) {
      console.log(event, "rec error");
    };
    recognition.onend = function (event) {
      console.log(event, "rec end");
    };

    recognition.start();

    return recognition;
  }

  return (
    <div className="Popup">
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
        <button className="Popup-Controls-Mic" onClick={micClick}>
          {recording ? <MicOffIcon /> : <MicOnIcon />}
        </button>

        <button className="Popup-Controls-Settings">
          <SettingsIcon />
        </button>
      </div>
    </div>
  );
}

export default Popup;
