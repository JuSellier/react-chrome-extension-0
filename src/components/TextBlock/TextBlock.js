import React from "react";
import "./TextBlock.scss";

import { RiFileCopy2Line as CopyIcon } from "react-icons/ri";
import { RiDeleteBin2Line as DeleteIcon } from "react-icons/ri";

const TextBlock = ({ text, date, time }) => {
  return (
    <section className="TextBlock">
      <div className="TextBlock-Text">{text}</div>
      <div className="TextBlock-Date">{date}</div>
      <div className="TextBlock-Time">{time}</div>

      <div className="TextBlock-Copy">
        <CopyIcon />
      </div>
      <div className="TextBlock-Remove">
        <DeleteIcon />
      </div>
    </section>
  );
};

export default TextBlock;
