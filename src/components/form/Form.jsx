import Education from "./Education";
import Introduction from "./Introduction";

function Form() {
  return (
    <form className="form">
      <Introduction />
      <Education />
      <button type="button">Go back</button>
      <button type="button">Next</button>
    </form>
  );
};

export default Form;
