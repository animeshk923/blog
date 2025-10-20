import "./App.css";
import Header from "./components/Header.jsx";
import BlogCard from "./components/BlogCard.jsx";
import HighlightBlog from "./components/HIghlightBlog.jsx";
import { Link } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext.jsx";
function App() {
  return (
    <>
      <AdminProvider>
        <div className="mainContainer">
          <Header />
          <hr className="mainPagehr" />
          <div className="content">
            <HighlightBlog
              image={{
                src: "/assets/dark-laptop.jpg",
                alt: "highlight blog image",
              }}
              // TODO: dynamically render blog information from api call
              // Change component to achieve it
              blog={{
                timeline: "June, 2025",
                heading: "Becoming an open source dweller",
                description: "Well, kind of.",
              }}
            />
          </div>
        </div>
      </AdminProvider>
    </>
  );
}

export default App;
