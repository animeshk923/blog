import "./App.scss";
import Header from "./components/Header.jsx";
import BlogCard from "./components/BlogCard.jsx";
function App() {
  return (
    <>
      <div className="mainContainer">
        <Header />
        <hr className="mainPagehr" />
        <div className="content">
          <BlogCard
            image={{
              // TODO: make js file with blog component info as object collection and import here
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
          <BlogCard
            image={{
              // TODO: make js file with blog component info as object collection and import here
              src: "/assets/dark-laptop.jpg",
              alt: "highlight blog image",
            }}
            // TODO: dynamically render blog information from api call
            // Change component to achieve it
            blog={{
              timeline: "Oct, 2025",
              heading: "New Blog",
              description: "Well, yeah...",
            }}
          />
          <BlogCard
            image={{
              // TODO: make js file with blog component info as object collection and import here
              src: "/assets/dark-laptop.jpg",
              alt: "highlight blog image",
            }}
            // TODO: dynamically render blog information from api call
            // Change component to achieve it
            blog={{
              timeline: "Oct, 2025",
              heading: "New Blog",
              description: "Well, yeah...",
            }}
          />
          <BlogCard
            image={{
              // TODO: make js file with blog component info as object collection and import here
              src: "/assets/dark-laptop.jpg",
              alt: "highlight blog image",
            }}
            // TODO: dynamically render blog information from api call
            // Change component to achieve it
            blog={{
              timeline: "Oct, 2025",
              heading: "New Blog",
              description: "Well, yeah...",
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
