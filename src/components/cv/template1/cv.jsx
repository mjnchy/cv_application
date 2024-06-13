import "./styles.css";

function CV({ cv }) {
  const skills = cv.skills.map(skill => <li className="cv-skill" key={skill.id}>{skill.name} ({skill.experience})</li>);

  return (
    <div className="cv" id="cv-template-1">
      <div className="cv-left">
        <h1 className="cv-header" id="cv-name">{cv.name.first} {cv.name.last}</h1>
        <div className="cv-section" id="cv-contact">
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

        <div className="cv-section" id="cv-skills">
          <div className="cv-dec-container">
            <h3 className="cv-section-dec">Skills</h3>
          </div>
          <ul className="cv-skill-list">
            {skills}
          </ul>
        </div>
      </div>
      <div className="cv-right"></div>
    </div>
  );
};

export default CV;
