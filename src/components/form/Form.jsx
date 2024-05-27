import { useState } from "react";
import Education from "./Education";
import Experience from "./Experience";
import Introduction from "./Introduction";
import Skills from "./Skills";

function Form() {
  const [segment, setSegment] = useState(0);
  const segments = [
    [ <Introduction />, "Introduction" ],
    [ <Education />, "Education" ],
    [ <Skills />, "Skills" ],
    [ <Experience />, "Work Experience" ] 
  ];

  return (
    <form className="form">
      {segment < 1 ? null :
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
          onClick={() => setSegment(segment + 1)}>
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

export default Form;
