import "./App.scss";
import Header from "./components/Header.jsx";
import BlogCard from "./components/BlogCard.jsx";
import React, { useEffect, useState } from "react";
import axiosInstance, { apiUrl } from "./api/axios.js";
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
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <div className="mainContainer">
        <Header />
        <hr className="mainPagehr" />
        <div className="content">
          {loading && (
            <div className="loading-state">
              <p>Loading blogs...</p>
            </div>
          )}

          {error && (
            <div className="error-state">
              <p>Failed to load blogs. Please try again later.</p>
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          )}

          {!loading && !error && blogs.length === 0 && (
            <div className="empty-state">
              <p>No published blogs yet. Check back soon!</p>
            </div>
          )}

          {!loading &&
            !error &&
            blogs.length > 0 &&
            blogs.map((blog) => {
              return (
                <BlogCard
                  key={blog.id}
                  blogid={blog.id}
                  image={{
                    // TODO: import image src from blog data backend after integrating with cloudflare R2. Extract image link and populate here.
                    src: blog.image || "/assets/dark-laptop.jpg",
                    alt: blog.imageAlt || "blog image",
                  }}
                  blog={{
                    timeline: blog.time
                      ? new Date(blog.time).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : "Recent",
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