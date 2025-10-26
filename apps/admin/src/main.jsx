import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";
import DraftBlogs from "./components/DraftBlogs.jsx";
import Dashboard from "./components/Dashboard.jsx";
import TextEditor from "./components/TextEditor.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <ProtectedRoutes />,
        children: [
          { index: true, element: <Dashboard /> },
          {
            path: "blog",
            children: [
              { path: "new", element: <TextEditor /> },
              { path: "edit/:blogid", element: <TextEditor /> },
              { path: "drafts", element: <DraftBlogs /> },
            ],
          },
        ],
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminProvider>
      <RouterProvider router={router} />
    </AdminProvider>
  </StrictMode>
);
