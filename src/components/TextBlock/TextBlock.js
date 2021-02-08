import React from "react";

const TextBlock = ({ text, date, time }) => {
  return (
    <section className="TextBlock">
      <div className="TextBlock-Text">{text}</div>
      <div className="TextBlock-Date">{date}</div>
      <div className="TextBlock-Time">{time}</div>

      <div className="TextBlock-Copy">Copy</div>
      <div className="TextBlock-Remove">Remove</div>
    </section>
  );
};

export default TextBlock;
