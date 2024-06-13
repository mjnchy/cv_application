import SidePanel from "./components/SidePanel";
import CV from "./components/cv/cv";
import Form from "./components/form/Form";

const cv = JSON.parse(localStorage.getItem("cv"));

function App() {
  return (
    <>
      <SidePanel />
      <main className="main" id="main">
        <CV cv={cv} />
      </main>
    </>
  );
};

export default App
