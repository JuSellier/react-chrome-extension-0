/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from "react";
import "../styles/defaults.scss";
import "./Popup.scss";

function Popup() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(
    +chrome.storage.getItem("length") || 20
  ); // default number of character

  const copyEl = useRef();

  useEffect(() => {
    changePassword();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // returns all possible characters to use in a password
  function getPossibleChars() {
    const letters = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;
    const digits = `0123456789`;
    const specialCharacters = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`;
    return letters + digits + specialCharacters;
  }

  function changePassword() {
    const chars = getPossibleChars();
    let str = "";
    for (let i = 0; i < passwordLength; i++) {
      const randInt = Math.floor(Math.random() * chars.length);
      str += chars[randInt];
    }
    setPassword(() => str);
    return str;
  }

  function copyPassword() {
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state === "granted" || result.state === "prompt") {
        /* write to the clipboard now */
        navigator.clipboard.writeText(password).then(
          function () {
            /* clipboard successfully set */
            copyEl.current.classList.add("copied");
            setTimeout(() => {
              copyEl.current.classList.remove("copied");
            }, 200);
          },
          function () {
            /* clipboard write failed */
            copyEl.current.classList.add("error");
            setTimeout(() => {
              copyEl.current.classList.remove("error");
            }, 200);
          }
        );
      }
    });
  }

  function changePasswordLength(e) {
    setPasswordLength(e.target.value);
    chrome.storage.setItem("length", e.target.value);
  }
  return (
    <div className="Popup">
      <div className="Popup-Password">
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(() => e.target.value)}
        ></input>
        <button
          ref={copyEl}
          className="Popup-Password-Copy"
          onClick={copyPassword}
        >
          Copy
        </button>
      </div>

      <div className="Popup-Controls">
        <div className="Popup-Controls-Length">
          <label>Password length:</label>
          <input
            type="number"
            value={passwordLength}
            onChange={changePasswordLength}
          ></input>
        </div>

        <button onClick={changePassword} className="Popup-Controls-New">
          New password
        </button>
      </div>
    </div>
  );
}

export default Popup;
