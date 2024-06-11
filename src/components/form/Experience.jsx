import { useState } from "react";
import Field from "./Field";

function Experience({ arr, cnt }) {
  const [jobCnt, setJobCnt] = useState(Math.max(0, cnt));
  const jobs = [];
  for (let i = 0; i <= jobCnt; i++) jobs.push(<Job index={i} work={arr[i]} key={`job${i}`} />);

  return (
    <div className="form-page">
      <div className="form-welcome">
        <h2 className="form-welcome-header">Share about your previous work experiences with us.</h2>
        <p className="form-welcome-extension">
          Employers usually look for prior work experience when hiring. This section helps your potential employers know more about 
          your work experiences.
        </p>
      </div>

      <div className="experience form-container">
        {jobs}
        <button
          className="button add-btn fa-solid fa-plus"
          type="button"
          onClick={() => setJobCnt(jobCnt + 1)}>
          Add Another Work Experience
        </button>
      </div>
    </div>
  );
};

function Job({ index, work }) {
  work ? null : work = { name: "", employer: "", from: "", to: "" };
  return (
    <div className="segment">
      <div className="form-section">
        <Field id={`work-${index}-name`} labelText="Job" name={`work${index}Name`} value={work.name} />
        <Field id={`work-${index}-employer`} labelText="Employer" name={`work${index}Employer`} value={work.employer} />
      </div>
      <div className="form-section">
        <Field id={`work-${index}-from`} labelText="From" name={`work${index}From`} inputType="date" value={work.from} />
        <Field id={`work-${index}-to`} labelText="To" name={`work${index}To`} inputType="date" value={work.to} />
      </div>
    </div>
  );
};

export default Experience;
