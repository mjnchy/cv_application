function Field({ id, labelText, inputType="text" }) {
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>{labelText}</label>
      <input className="field-input" id={id} type={inputType} />
    </div>
  );
};

export default Field;
