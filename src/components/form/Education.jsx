import { useState } from "react";
import Field from "./Field";

function Education() {
  const [schlCnt, setSchlCnt] = useState(0);
  const schools = [];
  for (let i = 0; i <= schlCnt; i++) schools.push(<School index={i} key={i} />);

  return (
    <div className="education form-page">
      {schools}
      <button className="button add-segment" type="button" onClick={() => setSchlCnt(schlCnt + 1)}>Add Another School</button>
    </div>
  );
};

function School({ index }) {
  return (
    <>
      <div className="form-section">
        <Field id={`school-${index}-name`} labelText="School Name" name={`school${index}Name`} />
        <Field id={`school-${index}-locaiton`} labelText="School Location" name={`school${index}Location`} />
      </div>

      <div className="form-section">
        <Field id={`school-${index}-degree`} labelText="Degree" name={`school${index}Degree`} />
        <span className="field"></span>
      </div>
      
      <div className="form-section">
        <Field id={`school-${index}-major`} labelText="Field Of Study" name={`school${index}Major`} />
        <Field id={`school-${index}-grad-date`} labelText="Graduation Date (Or Expected)" name={`school${index}GradDate`} inputType="date" />
      </div>
    </>
  );
};

export default Education;
