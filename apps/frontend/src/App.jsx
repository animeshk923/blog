import "./App.scss";
import Header from "./components/Header.jsx";
import BlogCard from "./components/BlogCard.jsx";
import { useEffect, useState } from "react";
import axiosInstance, { apiUrl } from "../../admin/src/api/axios.js";
function App() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    async function fetchBlogs() {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get(`${apiUrl}/blog/published`);
        if (!cancelled) setBlogs(res.data || []);
      } catch (err) {
        console.error("Failed to load blogs:", err);
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    // TODO: make js file with blog component info as object collection and import here
    <>
      <div className="mainContainer">
        <Header />
        <hr className="mainPagehr" />
        <div className="content">
          {blogs.map((blog) => {
            // console.log(blog);
            console.log(blog.title);
            return (
              <BlogCard
                key={blog.id}
                image={{
                  // TODO: import image src from blog data backend after implementing cloudinary. Extract image link and populate here.
                  src: "/assets/dark-laptop.jpg",
                  alt: "highlight blog image",
                }}
                blog={{
                  // TODO: dynamically render blog information from api call
                  // Change component to achieve it
                  timeline: "Oct, 2025",
                  heading: blog.title,
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
