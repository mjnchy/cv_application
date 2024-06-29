import "./styles.css";

function CV({ cv }) {
  const skills = cv.skills.map(skill => <li className="cv-skill" key={skill.id}>{skill.name} ({skill.experience} of experience)</li>);
  const work = cv.experience.map(job => {
    const arr = job.responsibilities.split(/(?<=\.)\s/);
    const enhancedArr = [];
    
    for (let i = 0; i < arr.length; i++) enhancedArr[i] = { id: `achievement${i}`, achievement: arr[i] };
    const achievements = enhancedArr.map(arr => <li
      className="milestone-li" key={arr.id}>{arr.achievement}</li>
    );
    
    return <li className="milestone" key={job.id}>
      <div className="milestone-date">
        <div className="milestone-date-start">{job.startmonth}, {job.startyear} -</div>
        <div className="milestone-date-end">{job.endmonth}, {job.endyear}</div>
      </div>
      <div className="milestone-info">
        <h3 className="milestone-header">{job.name}</h3>
        <div className="milestone-organization-info">{job.employer}, {job.location}</div>
        <ul className="milestone-list">{achievements}</ul>
      </div>
    </li>
  });

  const schools = cv.schools.map(school => <li className="milestone" key={school.id}>
    <div className="milestone-date">
      <div className="milestone-date-end">{school.gradmonth}, {school.gradyear}</div>
      {new Date().getFullYear() < school.gradyear && <div className="milestone-date-expected">(Expected)</div>}
    </div>
    <div className="milestone-info">
      <h3 className="milestone-header">{school.degree} {school.major && `in ${school.major}`}</h3>
      <div className="milestone-organization-info">{school.name} - {school.location}</div>
    </div>
  </li>);

  return (
    <div className="cv" id="cv-template-1">
      <div className="cv-left">
        <h1 className="cv-header" id="cv-name">{cv.name.first} {cv.name.last}</h1>
        <div className="cv-section left" id="cv-contact">
          <div className="cv-dec-container">
            <h3 className="cv-dec left">Contact</h3>
          </div>
          <div className="cv-segment">
            <h4 className="cv-title">Address</h4>
            <p className="cv-info">{cv.address.city}, {cv.address.region} {cv.address.zip}</p>
          </div>

          <div className="cv-segment">
            <h4 className="cv-title">Phone</h4>
            <p className="cv-info">{cv.contact.phone}</p>
          </div>
          
          <div className="cv-segment">
            <h4 className="cv-title">E-mail</h4>
            <p className="cv-info">{cv.contact.email}</p>
          </div>
        </div>

        <div className="cv-section left" id="cv-skills">
          <div className="cv-dec-container">
            <h3 className="cv-dec left">Skills</h3>
          </div>
          <ul className="cv-skill-list">
            {skills}
          </ul>
        </div>
      </div>

      <div className="cv-right">
        {cv.intro && <div className="intro">{cv.intro}</div>}
        <div className="cv-section right">
          <hr className="horizontal-line" />
          <h3 className="cv-dec right">Work History</h3>
          <hr className="horizontal-line" />
          {work}
        </div>
        <div className="cv-section right">
          <hr className="horizontal-line" />
          <h3 className="cv-dec right">Education</h3>
          <hr className="horizontal-line" />
          {schools}
        </div>
      </div>
    </div>
  );
};

export default CV;
