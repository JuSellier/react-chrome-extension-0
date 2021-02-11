import React, { useState, useEffect } from "react";
import "../styles/defaults.scss";
import "./Popup.scss";

function Popup() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(16); // default number of character is 16

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
          },
          function () {
            /* clipboard write failed */
          }
        );
      }
    });
  }
  return (
    <div className="Popup">
      <div className="Popup-Password">
        <input type="text" value={password}></input>
        <button className="Popup-Controls-Copy" onClick={copyPassword}>
          Copy
        </button>
      </div>

      <div className="Popup-Controls">
        <input
          type="number"
          className="Popup-Controls-Length"
          value={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
        ></input>

        <button onClick={changePassword} className="Popup-Controls-New">
          New password
        </button>
      </div>
    </div>
  );
}

export default Popup;
