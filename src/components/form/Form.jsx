import { useState } from "react";
import Field from "./Field";

const cv = {
  name: { first: "", last: "" },
  address: { city: "", region: "", zip: "" },
  contact: { email: "", phone: ""},
  schools: [], skills: [], experience: []
};

function Form() {
  const [segment, setSegment] = useState(0);
  const segments = [
    [ <Introduction name={cv.name} address={cv.address} contact={cv.contact} />, "Introduction", () => updateCV(false) ],
    [ <Education arr={cv.schools} cnt={cv.schools.length - 1} />, "Education", () => updateCV(true, "schools", "school") ],
    [ <Skills arr={cv.skills} cnt={cv.skills.length - 1} />, "Skills", () => updateCV(true, "skills", "skill") ],
    [ <Experience arr={cv.experience} cnt={cv.experience.length - 1} />, "Work Experience", () => updateCV(true, "experience", "work") ]
  ];

  function updateCV(iterable, type, str) {
    const formData = [...new FormData(document.querySelector(".form")).entries()];

    if (iterable === false) {
      const keys = Object.keys(cv).slice(0, 3);
      let pointer = 0;
      for (let i = 0; i < keys.length; i++) {
        const innerKeys = Object.keys(cv[keys[i]]);
        for (let j = 0; j < innerKeys.length; j++) {
          cv[keys[i]][innerKeys[j]] = formData[pointer][1];
          pointer++;
        };
      };
    } else {
      const length = parseInt(formData.at(-1)[0].slice(str.length, str.length + 1));

      for (let i = 0; i <= length; i++) cv[type][i] = {};
      for (let i = 0; i < formData.length; i++) {
        const index = parseInt(formData[i][0].slice(str.length, str.length + 1));
        const prop = formData[i][0].slice(str.length + 1).toLowerCase();

        cv[type][index][prop] = formData[i][1];
      };
    };
    segment >= segments.length - 1 ? null : setSegment(segment + 1);
  };

  return (
    <form className="form">
      {segment < 1 ? <span className="form-nav-btn prev"></span> :
        <button 
          className="button form-nav-btn prev" 
          type="button" 
          onClick={() => setSegment(segment - 1)}>
          <i className="fa-solid fa-arrow-left"></i>
          <span className="btn-text-container">Go Back</span>
        </button>
      }
      {segments[segment][0]} 
      {segment >= segments.length - 1 ? null :
        <button
          className="button form-nav-btn next"
          type="button" 
          onClick={segments[segment][2]}>
          {`Next: ${segments[segment + 1][1]}`}
        </button>
      }
      {segment < segments.length - 1 ? null :
        <button 
          className="button form-nav-btn save" 
          type="submit">
          Save
        </button>
      }
    </form>
  );
};

function Introduction({ name, address, contact }) {
  return (
    <div className="form-page">
      <div className="form-welcome">
        <h2 className="form-welcome-header">Introduce yourself briefly below.</h2>
        <p className="form-welcome-extension">
          This section helps employers know about you and provides them with a way to contact you.
        </p>
      </div>

      <div className="introduction form-container">
        <div className="name form-section">
          <Field id="first-name" labelText="First Name *" name="first" value={name.first} />
          <Field id="last-name" labelText="Last Name *" name="last"  value={name.last} />
        </div>

        <div className="location form-section">
          <Field id="city" labelText="City" name="city" value={address.city} />
          <div className="form-sub-section">
            <Field id="region" labelText="State/Province" name="region" value={address.region} />
            <Field id="zip" labelText="Zip Code" name="zip" value={address.zip} />
          </div>
        </div>

        <div className="contact form-section">
          <Field id="email" labelText="Email *" name="email" value={contact.email} />
          <Field id="phone" labelText="Phone" name="phone" value={contact.phone} />
        </div>
      </div>
    </div>
  );
};

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

export default Form;
