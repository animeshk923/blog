import styles from "../styles/Dashboard.module.scss";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useMemo } from "react";
import axiosInstance, { apiUrl } from "../api/axios";

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
  }, []);

  const stats = useMemo(() => {
    const published = blogs.filter((blog) => blog.isPublished).length;
    const drafts = blogs.filter((blog) => !blog.isPublished).length;

    return [
      { label: "Total Blogs", value: blogs.length },
      { label: "Published", value: published },
      { label: "Drafts", value: drafts },
    ];
  }, [blogs]);

  async function handleDelete(blogid) {
    if (!confirm("Delete blog with id: " + blogid)) {
      alert("Deletion cancelled");
      return;
    }
    try {
      await axiosInstance.delete(`${apiUrl}/blog/${blogid}`);
      setBlogs((currentBlogs) =>
        currentBlogs.filter((blog) => blog.id !== blogid)
      );
    } catch (err) {
      console.error("Failed to delete blog:", err);
      alert("Failed to delete blog. Check console for details.");
    }
  }

  function handleNewBlog() {
    navigate("blog/new");
  }

  async function handleToggleBlogStatus(blogid, status) {
    try {
      await axiosInstance.put(`${apiUrl}/blog/${blogid}/toggle`, {
        publishStatus: status,
      });

      setBlogs((currentBlogs) =>
        currentBlogs.map((blog) =>
          blog.id === blogid ? { ...blog, isPublished: status } : blog
        )
      );
    } catch (err) {
      console.error("Failed to toggle blog status:", err);
      alert("Failed to update status. Please try again.");
    }
  }

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
          <h2 className={styles.tableTitle}>All Blogs</h2>
          <button className={styles.btnPrimary} onClick={handleNewBlog}>
            + New Blog
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
                        <Link to={`blog/edit/${blog.id}`}>
                          <button className={styles.btnEdit}>Edit</button>
                        </Link>
                        <button
                          className={styles.btnDelete}
                          onClick={() => {
                            handleDelete(blog.id);
                          }}
                        >
                          Delete
                        </button>
                        {blog.isPublished ? (
                          <button
                            className={styles.btnUnpublish}
                            onClick={() => {
                              handleToggleBlogStatus(blog.id, false);
                            }}
                          >
                            Unpublish
                          </button>
                        ) : (
                          <button
                            className={styles.btnPublish}
                            onClick={() => {
                              handleToggleBlogStatus(blog.id, true);
                            }}
                          >
                            Publish
                          </button>
                        )}
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
