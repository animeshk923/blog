import React from "react";
import styles from "../styles/Dashboard.module.scss";
import { Link } from "react-router-dom";

function Dashboard() {
  // placeholder data
  // TODO: fetch blogs from backend
  const blogs = [
    {
      id: 1,
      title: "Becoming an open source dweller",
      status: "Published",
      date: "2025-06-21",
      views: 1250,
      author: "Animesh Kumar",
    },
    {
      id: 2,
      title: "Building a File Uploader with Cloudinary",
      status: "Draft",
      date: "2025-10-15",
      views: 0,
      author: "Animesh Kumar",
    },
    {
      id: 3,
      title: "Sample Blog Post",
      status: "Published",
      date: "2025-06-15",
      views: 890,
      author: "Animesh Kumar",
    },
  ];

  const stats = [
    // replace icons with actual icons later on
    { label: "Total Blogs", value: "3", icon: "📝" },
    { label: "Published", value: "2", icon: "✅" },
    { label: "Drafts", value: "1", icon: "📄" },
    { label: "Total Views", value: "2,140", icon: "👁️" },
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
              <div className={styles.statIcon}>{stat.icon}</div>
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
          <table className={styles.blogsTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Date</th>
                <th>Views</th>
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
                      <span className={styles.authorText}>
                        by {blog.author}
                      </span>
                    </div>
                  </td>
                  {/* blog status column */}
                  <td>
                    <span
                      className={`${styles.statusBadge} 
                      ${styles[blog.status.toLowerCase()]}`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  {/* date column */}
                  <td className={styles.dateCell}>{blog.date}</td>
                  {/* views column */}
                  <td className={styles.viewsCell}>
                    {blog.views.toLocaleString()}
                  </td>
                  {/* actions column */}
                  <td>
                    <div className={styles.actionButtons}>
                      <button className={styles.btnEdit}>Edit</button>
                      <button className={styles.btnDelete}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
