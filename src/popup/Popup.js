import React, { useState, useEffect, useRef } from "react";
import "../styles/defaults.scss";
import "./Popup.scss";

import { HiOutlineClipboardCopy as CopyIcon } from "react-icons/hi";
import { MdAutorenew as NewIcon } from "react-icons/md";

function Popup() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(
    +localStorage.getItem("length") || 20
  ); // number of character

  const copyEl = useRef();

  useEffect(() => {
    if (!passwordLength) return;
    changePassword();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordLength]);

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

    let l = passwordLength;
    if (!l) l = 20; // if password length is undefined when clicking "new password", we generate a 20char password instead of nothing

    for (let i = 0; i < l; i++) {
      const randInt = Math.floor(Math.random() * chars.length);
      str += chars[randInt];
    }
    setPassword(() => str);
    return str;
  }

  function copyPassword() {
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state === "granted" || result.state === "prompt") {
        navigator.clipboard.writeText(password).then(
          function () {
            copyEl.current.classList.add("copied");
            setTimeout(() => {
              copyEl.current.classList.remove("copied");
            }, 200);
          },
          function () {
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
    const length = e.target.value;

    if (length < 1 || length >= Number.MAX_SAFE_INTEGER || !length) {
      setPasswordLength(() => null);
    } else {
      localStorage.setItem("length", length);
      setPasswordLength(() => length);
    }
  }

  function handlePasswordChange(e) {
    const newPassword = e.target.value;
    setPassword(() => newPassword);
  }

  return (
    <div className="Popup">
      <div className="Popup-Password">
        <input
          type="text"
          value={password}
          onChange={handlePasswordChange}
        ></input>
        <button
          ref={copyEl}
          className="Popup-Password-Copy"
          onClick={copyPassword}
        >
          <CopyIcon />
          Copy
        </button>
      </div>

      <div className="Popup-Controls">
        <button onClick={changePassword} className="Popup-Controls-New">
          <NewIcon />
          New password
        </button>

        <div className="Popup-Controls-Length">
          <label htmlFor="length">Password length:</label>
          <input
            id="length"
            type="number"
            min="1"
            value={passwordLength}
            onChange={changePasswordLength}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Popup;
