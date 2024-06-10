import { useState } from "react";
import Education from "./Education";
import Experience from "./Experience";
import Introduction from "./Introduction";
import Skills from "./Skills";

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
    [ <Education />, "Education", () => updateCV(true, "schools", "school") ],
    [ <Skills />, "Skills", () => updateCV(true, "skills", "skill") ],
    [ <Experience />, "Work Experience", () => updateCV(true, "experience", "work") ]
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

      for (let i = 0; i <= length; i++) cv[type].push({});
      for (let i = 0; i < formData.length; i++) {
        const index = parseInt(formData[i][0].slice(str.length, str.length + 1));
        const prop = formData[i][0].slice(7).toLowerCase();

        cv[type][index][prop] = formData[i][1];
      };
    };
    console.log(cv);
    segment >= segments.length - 1 ? null : setSegment(segment + 1);
  };

  return (
    <form className="form" onSubmit={e => {
      e.preventDefault();
      segments[segment][2]();
    }}>
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

export default Form;
