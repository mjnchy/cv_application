import { useState } from "react";
import Field from "./Field";

function Experience() {
  const [jobCnt, setJobCnt] = useState(0);
  const jobs = [];
  for (let i = 0; i <= jobCnt; i++) jobs.push(<Job index={i} key={`job${i}`} />);

  return (
    <div className="experience form-page">
      {jobs}
      <button
        className="button add-btn fa-solid fa-plus"
        type="button"
        onClick={() => setJobCnt(jobCnt + 1)}>
        Add Another Work Experience
      </button>
    </div>
  );
};

function Job({ index }) {
  return (
    <div className="segment">
      <div className="form-section">
        <Field id={`work-${index}-name`} labelText="Job" name={`work${index}Name`} />
        <Field id={`work-${index}-employer`} labelText="Employer" name={`work${index}Employer`} />
      </div>
      <div className="form-section">
        <Field id={`work-${index}-from`} labelText="From" name={`work${index}From`} inputType="date" />
        <Field id={`work-${index}-to`} labelText="To" name={`work${index}To`} inputType="date" />
      </div>
    </div>
  );
};

export default Experience;
