function LeftPanel() {
  const link = "Some link"
  return (
    <div className="panel left-panel">
      <Progression />

      <footer className="footer">
        <a href={link}>{link}</a>
      </footer>
    </div>
  );
};

function Progression() {
  return (
    <div className="progression">
      <ul className="progression-list">
        <li className="progression-item">
          <span className="number-container">
            <div className="number-div active">
              <span className="number">1</span>
            </div>
            <div className="number-line"></div>
          </span>
          <span className="item">Introduction</span>
        </li>

        <li className="progression-item">
          <span className="number-container">
            <div className="number-div">
              <span className="number">2</span>
            </div>
            <div className="number-line"></div>
          </span>
          <span className="item">Education</span>
        </li>

        <li className="progression-item">
          <span className="number-container">
            <div className="number-div">
              <span className="number">3</span>
            </div>
            <div className="number-line"></div>
          </span>
          <span className="item">Skills</span>
        </li>

        <li className="progression-item">
          <span className="number-container">
            <div className="number-div">
              <span className="number">4</span>
            </div>
            <div className="number-line"></div>
          </span>
          <span className="item">Experience</span>
        </li>
      </ul>

      <div className="progression-bar"></div>
    </div>
  )
};

export default LeftPanel;
