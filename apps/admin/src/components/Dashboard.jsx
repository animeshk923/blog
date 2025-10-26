import styles from "../styles/Dashboard.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance, { apiUrl } from "../api/axios";

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchBlogs() {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get(`${apiUrl}/blog`);
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

  let draftCount = 0;
  let publishedCount = 0;
  blogs.map((blog) => {
    if (blog.isPublished) {
      publishedCount += 1;
    } else {
      draftCount += 1;
    }
  });

  async function handleDelete(blogid) {
    try {
      alert("Delete blog with id: " + blogid);
      await axiosInstance.delete(`${apiUrl}/blog/${blogid}`);
      // remove the deleted blog from the state
      // setBlogs(blogs.filter((blog) => blog.id !== blogid));
      window.location.reload();
    } catch (err) {
      console.error("Failed to delete blog:", err);
      alert("Failed to delete blog. Check console for details.");
    }
  }
  const stats = [
    // replace icons with actual icons later on
    { label: "Total Blogs", value: blogs.length },
    { label: "Published", value: publishedCount },
    { label: "Drafts", value: draftCount },
    // { label: "Total Views", value: "2,140"},
  ];

  function handleNewBlog() {}

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className={styles.dashboardGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.statCard}>
              {/* <div className={styles.statIcon}>{stat.icon}</div> */}
              <div className={styles.statContent}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Blogs Table */}
      <div className={styles.card}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Recent Blogs</h2>
          <button className={styles.btnPrimary} onClick={handleNewBlog}>
            <Link to={"blog/new"}>+ New Blog</Link>
          </button>
        </div>

        <div className={styles.tableContainer}>
          {loading ? (
            <div className={styles.loading}>Loading blogs…</div>
          ) : error ? (
            <div className={styles.error}>Failed to load blogs</div>
          ) : (
            <table className={styles.blogsTable}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Date</th>
                  {/* <th>Views</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  // each row is a blog info
                  <tr key={blog.id}>
                    {/* title column */}
                    <td>
                      <div className={styles.blogTitle}>
                        <span className={styles.titleText}>{blog.title}</span>
                        {/* <span className={styles.authorText}>
                        by {blog.author}
                      </span> */}
                      </div>
                    </td>
                    {/* blog status column */}
                    <td>
                      {typeof blog.isPublished !== "undefined" ? (
                        <span
                          className={`${styles.statusBadge} ${
                            blog.isPublished ? styles.published : styles.draft
                          }`}
                        >
                          {blog.isPublished ? "published" : "draft"}
                        </span>
                      ) : (
                        <span className={styles.statusBadge}>unknown</span>
                      )}
                    </td>
                    {/* date column */}
                    <td className={styles.dateCell}>
                      {blog.time.split("").slice(0, 10)}
                    </td>
                    {/* views column */}
                    {/* <td className={styles.viewsCell}>
                    {blog.views.toLocaleString()}
                  </td> */}
                    {/* actions column */}
                    <td>
                      <div className={styles.actionButtons}>
                        <button className={styles.btnEdit}>Edit</button>
                        <button
                          className={styles.btnDelete}
                          onClick={() => {
                            handleDelete(blog.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
