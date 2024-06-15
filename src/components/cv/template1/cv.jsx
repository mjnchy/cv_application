import "./styles.css";

function CV({ cv }) {
  const skills = cv.skills.map(skill => <li className="cv-skill" key={skill.id}>{skill.name} ({skill.experience})</li>);
  const work = cv.experience.map(job => 
    <li className="cv-job" key={job.id}>
      <div className="job-time">{job.from} - {job.to}</div>
      <div className="job-info">{job.name} at {job.employer}</div>
    </li>)
  const schools = cv.schools.map(school => 
    <li className="school" key={school.id}>
      <div className="school-grad">{school.graddate}</div>
      <div className="school-info">{school.degree} at {school.name}</div>
    </li>)
  
  return (
    <div className="cv" id="cv-template-1">
      <div className="cv-left">
        <h1 className="cv-header" id="cv-name">{cv.name.first} {cv.name.last}</h1>
        <div className="cv-section left" id="cv-contact">
          <div className="cv-dec-container">
            <h3 className="cv-section-dec">Contact</h3>
          </div>
          <div className="cv-segment">
            <h4 className="cv-title">Address</h4>
            <p className="cv-info">{cv.address.city}, {cv.address.region}, {cv.address.zip}</p>
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
            <h3 className="cv-section-dec">Skills</h3>
          </div>
          <ul className="cv-skill-list">
            {skills}
          </ul>
        </div>
      </div>
      <div className="cv-right">
        {cv.intro && <div className="intro">{cv.intro}</div>}
        <div className="cv-section right">
          <h3 className="cv-section-dec">Work History</h3>
          {work}
        </div>

        <div className="cv-section right">
          <h3 className="cv-section-dec">Education</h3>
          {schools}
        </div>
      </div>
    </div>
  );
};

export default CV;
