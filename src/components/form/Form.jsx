import { useState } from "react";
import { Dropdown, Field, Textarea } from "./FieldComponents";

const options = {
  months: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ],
  years: (() => {
    const arr = [];
    const currentYear = new Date().getFullYear();
    const startYear = 1985;

    for(let i = currentYear; i >= startYear; i--) arr.push(i);
    return arr;
  })(),
  experience: ["Less than 1 year", "1-2 years", "2-3 years", "3-4 years", "4-5 years", "More than 5 years"],
  degree: ["High School or GED", "Associates", "Bachelors", "Masters", "PhD", "Vocational", "Some College"]
};

const cv = localStorage.getItem("cv") ? JSON.parse(localStorage.getItem("cv")) : {
  name: { first: "", last: "" },
  address: { city: "", region: "", zip: "" },
  contact: { email: "", phone: ""}, intro: "",
  schools: [], skills: [], experience: []
};

function Form({ onSubmit }) {
  const [segment, setSegment] = useState(0);
  const segments = [
    [
      <Introduction name={cv.name} address={cv.address} contact={cv.contact} intro={cv.intro} />,
      "Introduction",
      () => updateCV(false)
    ],
    [ 
      <Education arr={cv.schools} cnt={cv.schools.length - 1} />,
      "Education",
      () => updateCV(true, "schools", "school")
    ],
    [ 
      <Skills arr={cv.skills} cnt={cv.skills.length - 1} />,
      "Skills",
      () => updateCV(true, "skills", "skill")
    ],
    [ 
      <Experience arr={cv.experience} cnt={cv.experience.length - 1} />,
      "Work Experience",
      () => updateCV(true, "experience", "work")
    ]
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

      for (let i = 0; i <= length; i++) cv[type][i] = { id: `${str}${i}`};
      for (let i = 0; i < formData.length; i++) {
        const index = parseInt(formData[i][0].slice(str.length, str.length + 1));
        const prop = formData[i][0].slice(str.length + 1).toLowerCase();

        cv[type][index][prop] = formData[i][1];
      };
    };
    segment >= segments.length - 1 ? null : updateSegment(segment + 1);
  };

  function updateSegment(newSegment) {
    setSegment(() => {
      updateActiveItem(newSegment);
      return newSegment;
    });
  };

  function updateActiveItem(item) {
    const active = document.querySelector(".progression-item.active");
    !active ? null : active.classList.toggle("active");
    const progressionList = document.querySelector(".progression-list");
    progressionList.children[item].classList.add("active");
  };

  window.onload = () => updateActiveItem(segment);

  return (
    <form className="form" onSubmit={e => {
      e.preventDefault();
      segments[segment][2]();
      localStorage.setItem("cv", JSON.stringify(cv));
      onSubmit();
    }} >
      {segment < 1 ? <span className="form-nav-btn prev"></span> :
        <button 
          className="button form-nav-btn prev" 
          type="button" 
          onClick={() => updateSegment(segment - 1)}>
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

function Introduction({ name, address, contact, intro }) {
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
          <Field id="first-name" name="first" labelText="First Name" value={name.first} />
          <Field id="last-name" name="last" labelText="Last Name" value={name.last} />
        </div>

        <div className="location form-section">
          <Field id="city" name="city" labelText="City" value={address.city} />
          <div className="form-sub-section">
            <Field id="region" name="region" labelText="State/Province" value={address.region} />
            <Field id="zip" name="zip" labelText="Zip Code" value={address.zip} />
          </div>
        </div>

        <div className="contact form-section">
          <Field id="email" name="email" labelText="Email" value={contact.email} />
          <Field id="phone" name="phone" labelText="Phone" value={contact.phone} />
        </div>

        <div className="self-intro form-section">
          <Textarea 
            id="intro" 
            name="intro"
            labelText="Provide a brief introduction about yourself within 500 characters."
            maxLength={500}
            value={intro} />
        </div>
      </div>
    </div>
  );
};

function Education({ arr, cnt }) {
  const [schlCnt, setSchlCnt] = useState(Math.max(0, cnt));
  const [activeDropMenu, setActiveDropMenu] = useState(null);
  const [dropdownValues, setDropdownValues] = useState({});
  const schools = [];

  for (let i = 0; i <= schlCnt; i++) 
    schools.push(<School 
    index={i} 
    school={arr[i]} 
    activeDropMenu={activeDropMenu}
    toggleActive={toggleActive}
    dropdownValues={dropdownValues}
    setDropdownValue={setDropdownValue}
    key={i} />);

  function toggleActive(id) {
    setActiveDropMenu(prev => prev !== id && id);
  };

  function setDropdownValue(id, value) {
    setDropdownValues(prev => ({ ...prev, [id]: value }));
  };

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
          onClick={() => {
            toggleActive(null);
            setSchlCnt(schlCnt + 1);
          }}>
          Add Another School
        </button>
      </div>
    </div>
  );
};


function Skills({ arr, cnt }) {
  const [skillCnt, setSkillCnt] = useState(Math.max(0, cnt));
  const [activeDropMenu, setActiveDropMenu] = useState(null);
  const [dropdownValues, setDropdownValues] = useState({});
  const skills = [];

  for (let i = 0; i <= skillCnt; i++) 
    skills.push(<Skill 
    index={i} 
    skill={arr[i]}
    activeDropMenu={activeDropMenu}
    toggleActive={toggleActive}
    dropdownValues={dropdownValues}
    setDropdownValue={setDropdownValue}
    key={i} />);

  function toggleActive(id) {
    setActiveDropMenu(prev => prev !== id && id);
  };

  function setDropdownValue(id, value) {
    setDropdownValues(prev => ({ ...prev, [id]: value }));
  };

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
          onClick={() => {
            toggleActive(null);
            setSkillCnt(skillCnt + 1);
          }}>
          Add Another Skill
        </button>
      </div>
    </div>
  );
};

function Experience({ arr, cnt }) {
  const [jobCnt, setJobCnt] = useState(Math.max(0, cnt));
  const [activeDropMenu, setActiveDropMenu] = useState(null);
  const [dropdownValues, setDropdownValues] = useState({});
  const jobs = [];

  for (let i = 0; i <= jobCnt; i++) 
    jobs.push(<Job 
    index={i} 
    work={arr[i]}
    activeDropMenu={activeDropMenu}
    toggleActive={toggleActive}
    dropdownValues={dropdownValues}
    setDropdownValue={setDropdownValue}
    key={`job${i}`} />);

  function toggleActive(id) {
    setActiveDropMenu(prev => prev !== id && id);
  };

  function setDropdownValue(id, value) {
    setDropdownValues(prev => ({ ...prev, [id]: value }));
  };

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
          onClick={() => {
            toggleActive(null);
            setJobCnt(jobCnt + 1);
          }}>
          Add Another Work Experience
        </button>
      </div>
    </div>
  );
};

function School({ index, school, activeDropMenu, toggleActive, dropdownValues, setDropdownValue }) {
  const monthId = `school-${index}-grad-month`;
  const yearId = `school-${index}-grad-year`;
  const degreeId = `school-${index}-degree`;
  school = school || { name: "", location: "", degree: "", major: "", gradmonth: "", gradyear: "" }
  
  return (
    <div className="segment">
      <div className="form-section">
        <Field id={`school-${index}-name`} labelText="School Name" name={`school${index}Name`} value={school.name} />
        <Field id={`school-${index}-locaiton`} labelText="School Location" name={`school${index}Location`} value={school.location} />
      </div>

      <div className="form-section">
        <div className="field">
          <label className="field-label">Degree</label>
          <Dropdown 
            id={degreeId}
            isActive={activeDropMenu === degreeId}
            toggleActive={() => toggleActive(degreeId)}
            value={dropdownValues[degreeId] || school.degree}
            setValue={newValue => setDropdownValue(degreeId, newValue)}>
            {options.degree}
          </Dropdown>
        </div>
        <span className="field"></span>
      </div>

      <div className="form-section">
        <Field id={`school-${index}-major`} labelText="Field Of Study" name={`school${index}Major`} value={school.major} />
        <div className="field">
          <label className="field-label">Graduation Date(Or Expected)</label>
          <div className="form-sub-section">
            <Dropdown 
              id={monthId}
              isActive={activeDropMenu === monthId}
              toggleActive={() => toggleActive(monthId)}
              value={dropdownValues[monthId] || school.gradmonth}
              setValue={newValue => setDropdownValue(monthId, newValue)}>
              {options.months}
            </Dropdown>
            <Dropdown 
              id={yearId}
              isActive={activeDropMenu === yearId}
              toggleActive={() => toggleActive(yearId)}
              value={dropdownValues[yearId] || school.gradyear}
              setValue={newValue => setDropdownValue(yearId, newValue)}>
              {options.years}
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

function Skill({ index, skill, activeDropMenu, toggleActive, dropdownValues, setDropdownValue }) {
  const experienceId = `skill-${index}-experience`;
  skill = skill || { name: "", experience: "" };

  return (
    <div className="segment">
      <div className="form-section">
        <Field id={`skill-${index}-name`} labelText="Skill" name={`skill${index}Name`} value={skill.name} />
        <div className="field">
          <label className="field-label">Experience</label>
          <Dropdown 
            id={experienceId}
            isActive={activeDropMenu === experienceId}
            toggleActive={() => toggleActive(experienceId)}
            value={dropdownValues[experienceId] || skill.experience}
            setValue={newValue => setDropdownValue(experienceId, newValue)}>
            {options.experience}
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

function Job({ index, work, activeDropMenu, toggleActive, dropdownValues, setDropdownValue }) {
  const monthStartId = `work-${index}-start-month`;
  const yearStartId = `work-${index}-start-year`;
  const monthEndId = `work-${index}-end-month`;
  const yearEndId = `work-${index}-end-year`;
  work = work || { name: "", employer: "", startmonth: "", startyear: "", endmonth: "", endyear: "", location: "" };
  
  return (
    <div className="segment">
      <div className="form-section">
        <Field id={`work-${index}-name`} labelText="Job" name={`work${index}Name`} value={work.name} />
        <Field id={`work-${index}-employer`} labelText="Employer" name={`work${index}Employer`} value={work.employer} />
      </div>
      
      <div className="form-section">
        <Field id={`work-${index}-location`} labelText="Location" name={`work${index}Location`} value={work.location} />
        <div className="field"></div>
      </div>

      <div className="form-section">
        <div className="field">
          <label className="field-label">From</label>
          <div className="form-sub-section">
          <Dropdown 
            id={monthStartId}
            isActive={activeDropMenu === monthStartId}
            toggleActive={() => toggleActive(monthStartId)}
            value={dropdownValues[monthStartId] || work.startmonth}
            setValue={newValue => setDropdownValue(monthStartId, newValue)}>
            {options.months}
          </Dropdown>
          <Dropdown 
            id={yearStartId}
            isActive={activeDropMenu === yearStartId}
            toggleActive={() => toggleActive(yearStartId)}
            value={dropdownValues[yearStartId] || work.startyear}
            setValue={newValue => setDropdownValue(yearStartId, newValue)}>
            {options.years}
          </Dropdown>
          </div>
        </div>
        <div className="field">
          <label className="field-label">To</label>
          <div className="form-sub-section">
          <Dropdown 
            id={monthEndId}
            isActive={activeDropMenu === monthEndId}
            toggleActive={() => toggleActive(monthEndId)}
            value={dropdownValues[monthEndId] || work.endmonth}
            setValue={newValue => setDropdownValue(monthEndId, newValue)}>
            {options.months}
          </Dropdown>
          <Dropdown 
            id={yearEndId}
            isActive={activeDropMenu === yearEndId}
            toggleActive={() => toggleActive(yearEndId)}
            value={dropdownValues[yearEndId] || work.endyear}
            setValue={newValue => setDropdownValue(yearEndId, newValue)}>
            {options.years}
          </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
