import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { useAdmin } from "./context/AdminContext";

function App() {
  return (
    <>
      <div className="mainContainer">
        <Header />
        <div className="content">
          <Outlet />            
        </div>
      </div>
    </>
  );
}

export default App;
