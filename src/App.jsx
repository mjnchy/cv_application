import { useState } from "react";
import SidePanel from "./components/SidePanel";
import CV from "./components/cv/template1/cv";
import Form from "./components/form/Form";

const cv = null;
// JSON.parse(localStorage.getItem("cv"));

function App() {
  const [submitted, setSubmitted] = useState(cv && true);
  return (
    <>
      <SidePanel />
      <main className="main" id="main">
        {submitted ? <CV cv={cv} /> : <Form onSubmit={() => setSubmitted(true)} /> }
      </main>
    </>
  );
};

export default App
