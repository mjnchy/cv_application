import SidePanel from "./components/SidePanel";
import Form from "./components/form/Form";

function App() {
  return (
    <>
      <SidePanel />
      <main className="main" id="main">
        <Form />
      </main>
    </>
  );
};

export default App
