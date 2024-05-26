import { useState } from "react";
import Field from "./Field";

function Skills() {
  const [skillCnt, setSkillCnt] = useState(0);
  const skills = [];
  for (let i = 0; i <= skillCnt; i++) skills.push(<Skill index={i} key={i} />);

  return (
    <div className="skills form-page">
      {skills}
      <button className="button add-segment" type="button" onClick={() => setSkillCnt(skillCnt + 1)}>Add Another Skill</button>
    </div>
  );
};

function Skill({ index }) {
  return (
    <>
      <div className="form-section">
        <Field id={`skill-${index}-name`} labelText="Skill" name={`skill${index}Name`} />
        <Field id={`skill-${index}-experience`} labelText="Experience" name={`skill${index}Experience`} />
      </div>
    </>
  );
};

export default Skills;
