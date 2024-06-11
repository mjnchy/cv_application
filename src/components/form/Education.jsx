import { useState } from "react";
import Field from "./Field";

function Education({ arr, cnt }) {
  const [schlCnt, setSchlCnt] = useState(Math.max(0, cnt));
  const schools = [];
  for (let i = 0; i <= schlCnt; i++) schools.push(<School index={i} school={arr[i]} key={i} />);

  return (
    <div className="form-page">
      <div className="form-welcome">
        <h2 className="form-welcome-header">Tell us about your educational background.</h2>
        <p className="form-welcome-extension">
          This section informs employers about your educational background.
        </p>
      </div>

      <div className="education form-container">
        {schools}
        <button 
          className="button add-btn fa-solid fa-plus"
          type="button" 
          onClick={() => setSchlCnt(schlCnt + 1)}>
          Add Another School
        </button>
      </div>
    </div>
  );
};

function School({ index, school }) {
  school ? null : school = { name: "", location: "", degree: "", major: "", graddate: "" }
  return (
    <div className="segment">
      <div className="form-section">
        <Field id={`school-${index}-name`} labelText="School Name" name={`school${index}Name`} value={school.name} />
        <Field id={`school-${index}-locaiton`} labelText="School Location" name={`school${index}Location`} value={school.location} />
      </div>

      <div className="form-section">
        <Field id={`school-${index}-degree`} labelText="Degree" name={`school${index}Degree`} value={school.degree} />
        <span className="field"></span>
      </div>
      
      <div className="form-section">
        <Field id={`school-${index}-major`} labelText="Field Of Study" name={`school${index}Major`} value={school.major} />
        <Field id={`school-${index}-grad-date`} labelText="Graduation Date (Or Expected)" name={`school${index}GradDate`} inputType="date" value={school.graddate} />
      </div>
    </div>
  );
};

export default Education;
