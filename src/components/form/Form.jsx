import Education from "./Education";
import Introduction from "./Introduction";
import Skills from "./Skills";

function Form() {
  return (
    <form className="form">
      <Introduction />
      <Education />
      <Skills />
      <button type="button">Go back</button>
      <button type="button">Next</button>
    </form>
  );
};

export default Form;
