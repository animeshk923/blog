import "./App.css";
import Header from "./components/Header";
import { useAdmin } from "./context/AdminContext";
function App() {
  const { isAdmin } = useAdmin();
  return (
    <>
      <div className="mainContainer">
        <Header />
        <div className="content">
          {isAdmin && <h1>DASHBOARD</h1>}
          {!isAdmin && <h2>Log in to continue</h2>}
        </div>
      </div>
    </>
  );
}

export default App;
