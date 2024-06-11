import { useState } from "react";
import Field from "./Field";

function Skills({ arr, cnt }) {
  const [skillCnt, setSkillCnt] = useState(Math.max(0, cnt));
  const skills = [];
  for (let i = 0; i <= skillCnt; i++) skills.push(<Skill index={i} skill={arr[i]} key={i} />);

  return (
    <div className="form-page">
      <div className="form-welcome">
        <h2 className="form-welcome-header">What are you skilled in?</h2>
        <p className="form-welcome-extension">
          Listing out individual skills can be a great way to enhance your resume and attract potential employers.
        </p>
      </div>

      <div className="skills form-container">
        {skills}
        <button 
          className="button add-btn fa-solid fa-plus"
          type="button" 
          onClick={() => setSkillCnt(skillCnt + 1)}>
          Add Another Skill
        </button>
      </div>
    </div>
  );
};

function Skill({ index, skill }) {
  skill ? null : skill = { name: "", experience: "" };
  return (
    <div className="segment">
      <div className="form-section">
        <Field id={`skill-${index}-name`} labelText="Skill" name={`skill${index}Name`} value={skill.name} />
        <Field id={`skill-${index}-experience`} labelText="Experience" name={`skill${index}Experience`} value={skill.experience} />
      </div>
    </div>
  );
};

export default Skills;
