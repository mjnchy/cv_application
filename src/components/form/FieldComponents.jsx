function Field({ id, name, labelText, inputType="text", value }) {
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>{labelText}</label>
      <input className="field-input" id={id} type={inputType} name={name} defaultValue={value} />
    </div>
  );
};

function Textarea({ id, name, labelText, value, maxLength }) {
  return <div className="field text-area-container">
    <label className="field-label" htmlFor={id}>{labelText}</label>
    <textarea className="text-area" id={id} maxLength={maxLength} name={name} defaultValue={value} />
  </div>
};

function Dropdown({ id, children, isActive, toggleActive, value, setValue }) {
  const name = id.replace(/-(.)/g, (_, g1) => g1.toUpperCase());
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
    <input className="dropdown-value" tabIndex={-1} placeholder={placeHolders[index]} name={name} value={value} onChange={() => {}} />
    <button className={`fa-solid ${isActive && "fa-caret-up" || "fa-caret-down"} dropdown-icon`}></button>
    {isActive && <ul className="dropdown-list">{li}</ul>}
  </div>
};

export { Field, Dropdown, Textarea };
