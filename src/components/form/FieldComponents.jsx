import { useState } from "react";

function Field({ id, labelText, inputType="text", name, value }) {
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>{labelText}</label>
      <input className="field-input" id={id} type={inputType} name={name} defaultValue={value} />
    </div>
  );
};

function Dropdown({ id, children, isActive, toggleActive, value, setValue }) {
  const lastLetters = id.slice(-2);
  const placeHolders = ["Month", "Year", "Experience", "Degree"];
  let index;

  switch (lastLetters) {
    case "th":
      index = 0;
      break;
    case "ar":
      index = 1;
      break;
    case "ce":
      index = 2;
      break;
    case "ee":
      index = 3;
      break;
  };
  
  const li = children.map(child =>
    <li className="option" key={`${id}-${child}`}  onClick={(() => setValue(child))}>{child}</li>
  );

  return <div className="dropdown" onClick={toggleActive}>
    <input className="dropdown-value" placeholder={placeHolders[index]} name={id} defaultValue={value} />
    <button className="fa-solid fa-caret-down dropdown-icon"></button>
    {isActive && <ul className="dropdown-list">{li}</ul>}
  </div>
};

export { Field, Dropdown };