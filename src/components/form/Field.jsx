import { useState } from "react";

function Field({ id, labelText, inputType="text", name, value }) {
  const [fill, setFill] = useState(value)
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>{labelText}</label>
      <input className="field-input" id={id} type={inputType} name={name} value={fill} onChange={e => setFill(e.target.value)} />
    </div>
  );
};

export default Field;
