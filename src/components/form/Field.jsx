function Field({ id, labelText, inputType="text", name }) {
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>{labelText}</label>
      <input className="field-input" id={id} type={inputType} name={name} />
    </div>
  );
};

export default Field;
